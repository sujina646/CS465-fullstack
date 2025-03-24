const fs = require('fs').promises;
const path = require('path');

const travelController = async (req, res) => {
    try {
        // Read the trips.json file
        const tripsPath = path.join(__dirname, '../../data/trips.json');
        const data = await fs.readFile(tripsPath, 'utf8');
        const trips = JSON.parse(data);
        console.log('Trips data:', trips); // Debugging

        // Render the travel.hbs template with the trips data
        res.render('travel', {
            title: 'Travlr Getaways',
            trips: trips
        });
    } catch (error) {
        console.error('Error reading trips.json:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { travelController };