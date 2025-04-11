const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/travlr';

// Connect to the database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
}).catch(err => {
    console.log('Mongoose connection error:', err);
    process.exit(1);
});

// Monitor connection events
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
    mongoose.connection.close()
        .then(() => {
            console.log(`Mongoose disconnected through ${msg}`);
            callback();
        })
        .catch(err => {
            console.log('Error during mongoose disconnection:', err);
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
require('./travlr'); 