const User = require('.models/user');
const activity = require('.models/activity');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');

//const unirest = require('unirest');
//const events = require('events');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

//RUN/CLOSE SERVER
let server = undefined;

function runServer() {
    return new Promise((resolve, request) => {
        mongoose.connect(config.DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// USER ENDPOINTS
//POST -> Creating a new user (Registration)

app.post('/user/create', (req, res) => {
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                username,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                if (item) {
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });

    });
});


//GET -> User signing in

app.put('/signin', function (req, res) {
    const user = req.body.username;
    const pw = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                //wrong username
                return res.status(401).json({
                    message: 'Not Found!'
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: 'Not found'
                        });
                    } else {
                        var logInTime = new Date();
                        console.log('User logged in:' + req.body.username + 'at' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});

//ACTIVITY ENDPOINTS (CREATE?, FIND, DELETE?)
//FIND/GET -> accessing all of users activties
app.get('/activity/:user', function (req, res) {
    console.log(req.params.user);
    Activity
        .find()
        .sort()
        .then(function (activity) {
            let activityOutput = [];
            activity.map(function (activity) {
                if (activity.user == req.params.user) {
                    activityOutput.push(activity);
                }
            });
            res.json({
                activityOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//DELETE -> an activity by ID
app.delete('/activity/:id', function (req, res) {
    Activity.findByIdAndRemove(req.params.id).exec().then(function (activity) {
        return res.status(204).end();
    }).catch(function (err) {
        return .res.status(500).json({
            message: 'Internal server error'
        });
    });
});

//MISC -> catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;


//Pulled this from other github project
/*var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

// external API call
var getFromActive = function (searchTerm) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    unirest.get("http://api.amp.active.com/v2/search?topicName=Running&registerable_only=true&category=races&attributeValue=5k&sort=date_asc&per_page=24&near=" + searchTerm + ",US&radius=50&api_key=2e4ra5w6b9augfrn54vjb4bx")
        .header("Accept", "application/json")
        .end(function (result) {
            //console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};
// local API endpoints
app.get('/activity/:name', function (req, res) {


    //    external api function call and response

    var searchReq = getFromActive(req.params.name);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});




app.post('/add-to-favorites', function (req, res) {

    //db connection and data queries
    activity.create({
        name: req.body.name,
        date: req.body.date,
        place: req.body.place,
        url: req.body.url
    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.get('/populate-favorites', function (req, res) {
    activity.find(function (err, item) {
        console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

app.delete('/delete-favorites/:favoritesId', function (req, res) {
    activity.findByIdAndRemove(req.params.favoritesId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});



exports.app = app;
exports.runServer = runServer;

app.listen(3000);
*/
