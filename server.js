const User = require('./models/user');
const activity = require('./models/activity');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');

//const unirest = require('unirest');
//const events = require('events');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const BasicStrategy = require('passport-http').BasicStrategy;
const morgan = require('morgan');

const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

//JWT AUTHENTICATION
//const {
//    router: userRouter
//} = require('./user');
//const {
//    router: authRouter,
//    BasicStrategy,
//    jwtStrategy
//} = require('./auth/index')

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;


//
//const {
//    PORT,
//    DATABASE_URL
//} = require('./config');
//
//
//// Logging
//app.use(morgan('common'));
//
//// CORS
//app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//    if (req.method === 'OPTIONS') {
//        return res.send(204);
//    }
//    next();
//});
//
//
////passport.use(basicStrategy);
//passport.use(jwtStrategy);
//
//
//app.use('/api/users/', usersRouter);
//app.use('/api/auth/', authRouter);
//
///////////////////////////////////////////////////////////////////////////////
//
//
//passport.use(new JwtSession("dwibeiwiuwei"));
//
//options = {
//    secret: options.secret, //The decoding secret
//    requestKey: options.requestKey || 'user', //The key in the JWT that defines the user id
//    requestArg: options.requestArg || 'accessToken' /* The parameter name on the HTTP request that refers to the JWT. The middleware will look for this property in the query string, request body, and headers. The header name will be derived from a camelBack representation of the property name. For example, if the requestArg is "accessToken" (the default) then this instance of the middlware will look for the header name "x-access-token" */
//};
//
//app.use(passport.initialize());
//
//app.use(passport.authenticate('jwt', options));
///////////////////////////////////////////////////////////////////////

// A protected endpoint which needs a valid JWT to access it
//app.get(
//    '/api/protected',
//    passport.authenticate('jwt', {
//        session: false
//    }),
//    (req, res) => {
//        return res.json({
//            data: 'rosebud'
//        });
//    }
//);
//
//app.use('*', (req, res) => {
//    return res.status(404).json({
//        message: 'Not Found'
//    });
//});

//RUN/CLOSE SERVER
let server;

function runServer() {
    return new Promise((resolve, reject) => {
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
app.post('/signup', (req, res) => {
    let username = req.body.username;
    console.log(username);
    username = username.trim();

    let goals = req.body.goals;
    console.log(goals);

    let password = req.body.password;
    console.log(password);
    password = password.trim();

    let email = req.body.email;
    console.log(email);
    email = email.trim();

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
                verifyPw: hash,
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


//put -> User signing in

app.post('/signin/', function (req, res) {
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
                        //                        return res.status(401).json({
                        //                            message: 'Not found'
                        //                        });
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
        return res.status(500).json({
            message: 'Internal server error'
        });
    });
});

//Profile Activtiy
// Completing a new activity
app.post('/profile/activity', (req, res) => {
    console.log(req.body);
    let activityImg = req.body.img;
    let activityName = req.body.activityName;
    let activityPoints = req.body.activityPoints;
    let textBox = req.body.textBox;
    let user = req.body.user;

    activity.create({
        user,
        textBox,
        activityImg,
        activityName,
        activityPoints
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Activity \`${activityName}\` completed.`);
            return res.json(item);
        }
    });
});

//Take completed activity and put in feed
app.get('/profile/feed', function (req, res) {
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

//Feed page
// Indiv activity completion
app.post('/feed/post', (req, res) => {
    console.log(req.body);
    let activtyImg = req.body.img;
    let activityName = req.body.activityName;
    let activityPoints = req.body.activityPoints;
    let user = req.body.user;

    Activity.create({
        user,
        img,
        activityName,
        activityPoints
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Activity \`${activityName}\` completed.`);
            return res.json(item);
        }
    });
});

//Take completed activity and put in feed
app.get('/feed/post', function (req, res) {
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

//MISC -> catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
