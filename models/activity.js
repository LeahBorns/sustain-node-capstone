"use strict";

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    activityName: {
        type: String,
        required: false
    },
    points: {
        type: Number,
        required: true
    },
    committed: {
        type: Boolean,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
