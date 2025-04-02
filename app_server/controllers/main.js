const axios = require('axios');

// Define base API URL
const apiBaseUrl = 'http://localhost:3000/api/trips';

/* GET home page */
const index = async (req, res) => {
    try {
        // Get trips from API
        const response = await axios.get(apiBaseUrl);
        const trips = response.data;
        
        // Render the home page with trips
        res.render('index', { 
            title: 'Travlr Getaways',
            isHome: true,
            trips: trips
        });
    } catch (error) {
        console.error('Error fetching trips from API:', error);
        res.render('index', { 
            title: 'Travlr Getaways',
            isHome: true,
            trips: [],
            error: 'Unable to retrieve trip data at this time'
        });
    }
};

module.exports = {
    index
}; 