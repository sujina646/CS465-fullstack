const express = require('express');
const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const auth = require('../middleware/auth');

const router = express.Router();

/* Auth routes */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/* Public API routes */
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripId', ctrlTrips.tripsFindById);

/* Protected Admin API routes */
router.post('/trips', auth, ctrlTrips.tripsCreate);
router.put('/trips/:tripId', auth, ctrlTrips.tripsUpdate);
router.delete('/trips/:tripId', auth, ctrlTrips.tripsDelete);

module.exports = router; 