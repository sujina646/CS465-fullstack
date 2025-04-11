const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    length: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    resort: {
        type: String,
        required: true
    },
    perPerson: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }
});

// Compile the schema into a model
mongoose.model('Trip', tripSchema);

// Define a function to get all trips
const getAllTrips = async () => {
    const Trip = mongoose.model('Trip');
    try {
        return await Trip.find().exec();
    } catch (err) {
        console.error('Error getting all trips:', err);
        throw err;
    }
};

// Define a function to get a trip by ID
const getTripById = async (id) => {
    const Trip = mongoose.model('Trip');
    try {
        return await Trip.findById(id).exec();
    } catch (err) {
        console.error(`Error getting trip with ID ${id}:`, err);
        throw err;
    }
};

module.exports = {
    getAllTrips,
    getTripById
}; 