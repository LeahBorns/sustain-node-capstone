exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:admin@ds155634.mlab.com:55634/sustain-node-capstone' :
        'mongodb://admin:admin@ds155634. mlab.com:55634/sustain-node-capstone');
exports.PORT = process.env.PORT || 8080;
