const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;

// Set up Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Serve static files (CSS, images) from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
const travelRoutes = require('./app_server/routes/travel');
app.use('/travel', travelRoutes);

// Temporary route for home page (optional for testing)
app.get('/', (req, res) => {
    res.send('Welcome to Travlr Getaways - Visit /travel for the main page');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});