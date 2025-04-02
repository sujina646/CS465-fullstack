const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');

/* GET home page */
router.get('/', ctrlMain.index);

/* GET travel page */
router.get('/travel', ctrlTravel.travelList);

module.exports = router; 