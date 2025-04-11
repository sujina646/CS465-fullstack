const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Mock data for testing when database is unavailable
const mockTrips = [
    {
        code: 'GALR210214',
        name: 'Gale Reef',
        length: '4 nights / 5 days',
        start: new Date('2024-02-14'),
        resort: 'Gale Reef Resort',
        perPerson: '300.00',
        image: '/images/reef1.jpg',
        description: 'Gale Reef offers pristine waters and vibrant marine life. Perfect for both beginner and experienced divers.'
    },
    {
        code: 'DAWR210315',
        name: 'Dawson Reef',
        length: '3 nights / 4 days',
        start: new Date('2024-03-15'),
        resort: 'Dawson Reef Resort',
        perPerson: '250.00',
        image: '/images/reef2.jpg',
        description: 'Dawson Reef features unique underwater landscapes and diverse coral formations.'
    },
    {
        code: 'CLER210621',
        name: 'Clear Waters',
        length: '5 nights / 6 days',
        start: new Date('2024-06-21'),
        resort: 'Clear Waters Resort',
        perPerson: '350.00',
        image: '/images/reef3.jpg',
        description: 'Experience crystal clear waters and abundant marine life in this tropical paradise.'
    }
];

/**
 * GET /api/trips - Get all trips
 * Returns a list of all trips from the database
 */
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /api/trips/:tripCode - Get a single trip by code
 * Returns details for a specific trip based on code
 */
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ 'code': req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * POST /api/trips - Create a new trip
 * Creates a new trip in the database
 */
const tripsCreate = async (req, res) => {
    try {
        const newTrip = await Trip.create(req.body);
        res.status(201).json(newTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * PUT /api/trips/:tripCode - Update a trip
 * Updates an existing trip in the database
 */
const tripsUpdate = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            req.body,
            { new: true, runValidators: true }
        );
        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * DELETE /api/trips/:tripCode - Delete a trip
 * Deletes an existing trip from the database
 */
const tripsDelete = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ 'code': req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsCreate,
    tripsUpdate,
    tripsDelete
}; 