const mongoose = require('mongoose');

// Use environment variable or default to local MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
console.log(`Attempting to connect to MongoDB at ${dbURI}`);

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
}).catch(err => {
    console.log('Mongoose connection error:', err);
    // Don't exit during testing/development
    // process.exit(1);
});

// Connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown function
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

// Import models
require('./trips');
require('./users'); 