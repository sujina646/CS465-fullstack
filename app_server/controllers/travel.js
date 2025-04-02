const axios = require('axios');

// Define base API URL
const apiBaseUrl = 'http://localhost:3000/api/trips';

/* GET travel page */
const travelList = async (req, res) => {
    try {
        // Get trips from API
        const response = await axios.get(apiBaseUrl);
        const trips = response.data;
        
        // Render the page with trips
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

module.exports = {
    travelList
};