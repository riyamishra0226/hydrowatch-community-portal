// File: models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'Location location context is required'],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Contamination', 'Leakage', 'Low Pressure']
    },
    desc: {
        type: String,
        required: [true, 'Description text is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);