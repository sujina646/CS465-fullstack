const axios = require('axios');

// Define API URL based on environment
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel page */
const travelList = async (req, res) => {
    try {
        // Get trips from the API
        const response = await axios.get(`${apiOptions.server}/api/trips`);
        const trips = response.data;
        
        // Render the travel page with trips
        res.render('travel', { 
            title: 'Travel - Travlr Getaways',
            isTravel: true,
            trips: trips
        });
    } catch (error) {
        console.error('Error fetching trips from API:', error);
        res.render('travel', { 
            title: 'Travel - Travlr Getaways',
            isTravel: true,
            trips: [],
            error: 'Unable to retrieve trip data at this time'
        });
    }
};

/* GET trip details page */
const tripDetails = async (req, res) => {
    try {
        // Get tripCode from URL parameter
        const tripCode = req.params.tripCode;
        
        if (!tripCode) {
            throw new Error('Trip code is required');
        }
        
        // Get trip details from the API
        const response = await axios.get(`${apiOptions.server}/api/trips/${tripCode}`);
        const trip = response.data;
        
        // Render the trip details page
        res.render('trip-detail', {
            title: `${trip.name} - Travlr Getaways`,
            trip: trip
        });
    } catch (error) {
        console.error('Error fetching trip details from API:', error);
        res.render('error', {
            title: 'Error - Travlr Getaways',
            message: 'Unable to retrieve trip details at this time',
            error: req.app.get('env') === 'development' ? error : {}
        });
    }
};

module.exports = {
    travelList,
    tripDetails
};