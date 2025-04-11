# Travlr Getaways

A travel booking application built with Express and Handlebars.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Visit http://localhost:3000 in your browser

## API Usage

The application includes a RESTful API with the following endpoints:

### Get All Trips
```
GET /api/trips
```
Returns a list of all available trips.

### Get Trip by Code
```
GET /api/trips/:tripCode
```
Returns details for a specific trip based on its code.

## Testing with Postman

1. Start the server using `node server.js`
2. Open Postman
3. Test the API endpoints:
   - GET http://localhost:3000/api/trips (should return all trips)
   - GET http://localhost:3000/api/trips/GALR210214 (should return a specific trip)
   - GET http://localhost:3000/api/trips/INVALID (should return a 404 error)

## Database Configuration

The application uses MongoDB. By default, it connects to a local MongoDB instance at mongodb://127.0.0.1:27017/travlr.

To use an external MongoDB instance, set the MONGODB_URI environment variable.
