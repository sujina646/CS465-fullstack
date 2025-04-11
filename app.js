// Load database models
require('./app_api/models/db');

const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./app_api/routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api', apiRouter);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'app_client/dist/app_client')));

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app_client/dist/app_client/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;