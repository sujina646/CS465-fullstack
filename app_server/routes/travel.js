const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

router.get('/', travelController.travelController);

module.exports = router;