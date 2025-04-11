const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');

/* GET home page */
router.get('/', ctrlMain.index);

/* GET travel page */
router.get('/travel', ctrlTravel.travelList);

/* GET trip details page */
router.get('/travel/:tripCode', ctrlTravel.tripDetails);

module.exports = router; 