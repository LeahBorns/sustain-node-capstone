exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:admin@ds155634.mlab.com:55634/sustain-node-capstone' :
        'mongodb://admin:admin@ds155634.mlab.com:55634/sustain-node-capstone');
exports.PORT = process.env.PORT || 8080;

//exports.JWT_SECRET = process.env.JWT_SECRET;
//exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '365d';

exports.JWT_SECRET = process.env.JWT_SECRET;
DATABASE_URL = 'mongodb://admin:admin@ds155634.mlab.com:55634/sustain-node-capstone'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
