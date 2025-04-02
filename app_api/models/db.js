const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
}).catch(err => {
    console.log('Mongoose connection error:', err);
});

// Monitor for successful connection
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

// Monitor for connection error
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

// Monitor for disconnection
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown helper
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close()
        .then(() => {
            console.log(`Mongoose disconnected through ${msg}`);
            callback();
        })
        .catch(err => {
            console.log('Error during disconnection:', err);
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

// For Heroku app shutdown
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

// Bring in the schemas and models
require('./trips'); 