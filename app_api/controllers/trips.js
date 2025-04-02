const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET /api/trips - Get all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        console.log('Found trips:', trips); // Debug log
        res.status(200).json(trips);
    } catch (err) {
        console.error('Error finding trips:', err);
        res.status(500).json({
            error: 'Database error while retrieving trips'
        });
    }
};

// GET /api/trips/:tripId - Get a single trip
const tripsFindById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId).exec();
        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }
        res.status(200).json(trip);
    } catch (err) {
        console.error('Error finding trip by ID:', err);
        res.status(500).json({
            error: 'Database error while retrieving trip'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindById
}; 