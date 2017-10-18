"use strict";

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    activityName: {
        type: String,
        required: false
    },
    activityPoints: {
        type: Number,
        required: false
    },
    activityDescription: {
        type: String,
        required: false
    },
    activityImage: {
        type: String,
        required: false
    }
});


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
