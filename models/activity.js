"use strict";

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    username: String,
    name: String,
    points: Number,
    description: String,
    image: String,
    commited: Boolean
});


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
