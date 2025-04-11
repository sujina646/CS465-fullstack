const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/travlr';
require('./travlr');
const Trip = mongoose.model('Trip');

const trips = [
    {
        code: 'GALR210214',
        name: 'Gale Reef',
        length: '4 nights / 5 days',
        start: new Date('2024-02-14'),
        resort: 'Gale Reef Resort',
        perPerson: '300.00',
        price: 300.00,
        image: '/images/reef1.jpg',
        description: 'Gale Reef offers pristine waters and vibrant marine life. Perfect for both beginner and experienced divers.',
        location: 'Caribbean Sea',
        rating: 4.5
    },
    {
        code: 'DAWR210315',
        name: 'Dawson Reef',
        length: '3 nights / 4 days',
        start: new Date('2024-03-15'),
        resort: 'Dawson Reef Resort',
        perPerson: '250.00',
        price: 250.00,
        image: '/images/reef2.jpg',
        description: 'Dawson Reef features unique underwater landscapes and diverse coral formations.',
        location: 'Great Barrier Reef',
        rating: 4.2
    },
    {
        code: 'CLER210621',
        name: 'Clear Waters',
        length: '5 nights / 6 days',
        start: new Date('2024-06-21'),
        resort: 'Clear Waters Resort',
        perPerson: '350.00',
        price: 350.00,
        image: '/images/reef3.jpg',
        description: 'Experience crystal clear waters and abundant marine life in this tropical paradise.',
        location: 'Maldives',
        rating: 4.8
    }
];

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
    // Clear existing data
    return Trip.deleteMany();
}).then(() => {
    // Insert new data
    return Trip.insertMany(trips);
}).then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
}).catch(err => {
    console.log('Error:', err);
    mongoose.connection.close();
}); 