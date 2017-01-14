// models/task.js
'use strict';

// dependencies
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: [true, 'A task name is required']},
    note: { type: String, maxlength: [150, 'Only 50 characters or less are allowed']},
    completed: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('tasks', schema);
