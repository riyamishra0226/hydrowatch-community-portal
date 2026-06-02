// File: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Report = require('./models/Report');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Database Connection String Configuration Area
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hydrowatch';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Engine Successfully Associated.'))
    .catch(err => console.error('Database Connection Error Event Handled:', err));

// HTTP REST API ENDPOINTS

// 1. GET ALL REPORTS
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reports from data storage' });
    }
});

// 2. CREATE NEW REPORT INCIDENT
app.post('/api/reports', async (req, res) => {
    try {
        const { location, type, desc } = req.body;
        const newReport = new Report({ location, type, desc });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ error: 'Failed to process database saving action' });
    }
});

// Server initialization execution steps
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server executing successfully tracking processing loops inside port ${PORT}`);
});