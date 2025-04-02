const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Force JSON for all responses
router.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
});

// GET /api/trips - Get all trips
router.get('/trips', tripsController.tripsList);

// GET /api/trips/:tripId - Get a specific trip
router.get('/trips/:tripId', tripsController.tripsFindById);

// Catch-all for non-existent API routes
router.use('*', (req, res) => {
    res.status(404).json({
        "message": "API route not found"
    });
});

module.exports = router; 