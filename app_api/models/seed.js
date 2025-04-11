const mongoose = require('mongoose');
require('./db');
require('./trips');

const Trip = mongoose.model('trips');

const seedData = [
    {
        code: "GALR210214",
        name: "Gale Reef",
        length: "4 nights / 5 days",
        start: new Date("2024-02-14"),
        resort: "Emerald Bay Resort",
        perPerson: "$1,799",
        image: "reef1.jpg",
        description: "Discover the pristine coral reefs and marine life of Gale Reef."
    },
    {
        code: "DAWR210315",
        name: "Dawn Reef",
        length: "3 nights / 4 days",
        start: new Date("2024-03-15"),
        resort: "Crystal Waters Resort",
        perPerson: "$1,499",
        image: "reef2.jpg",
        description: "Experience the vibrant underwater world of Dawn Reef."
    },
    {
        code: "CRLR210415",
        name: "Coral Ridge",
        length: "5 nights / 6 days",
        start: new Date("2024-04-15"),
        resort: "Blue Lagoon Resort",
        perPerson: "$2,199",
        image: "reef3.jpg",
        description: "Explore the magnificent coral formations at Coral Ridge."
    }
];

const seedDB = async () => {
    try {
        // Clear existing data
        await Trip.deleteMany({});
        console.log('Cleared existing trips');

        // Insert new data
        const trips = await Trip.insertMany(seedData);
        console.log('Added sample trips:', trips);

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
    }
};

// Run the seed function
seedDB(); 