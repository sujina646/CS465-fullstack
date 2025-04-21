// Load database models
require('./app_api/models/db');

const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const apiRouter = require('./app_api/routes/index');

// Load passport config
require('./app_api/config/passport');

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Initialize Passport
app.use(passport.initialize());

// API Routes
app.use('/api', apiRouter);

// Serve images from the public/images directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

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