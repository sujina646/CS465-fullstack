const express = require('express');
const ctrlTrips = require('../controllers/trips');

const router = express.Router();

/* API routes */
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);
router.post('/trips', ctrlTrips.tripsCreate);
router.put('/trips/:tripCode', ctrlTrips.tripsUpdate);
router.delete('/trips/:tripCode', ctrlTrips.tripsDelete);

module.exports = router; 