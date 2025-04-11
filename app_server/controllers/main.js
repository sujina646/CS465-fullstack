const axios = require('axios');

// Define API URL based on environment
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET home page */
const index = async (req, res) => {
    try {
        // Get trips from the API
        const response = await axios.get(`${apiOptions.server}/api/trips`);
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