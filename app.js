require('./app_api/models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - Must come BEFORE view engine setup
const apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);

// View engine setup
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts')
}));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Web Routes
const webRoutes = require('./app_server/routes/index');
app.use('/', webRoutes);

// Error handling
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        // API error handling
        res.status(404).json({
            "message": "API route not found"
        });
    } else {
        // Web error handling
        res.status(404).render('error', {
            title: '404: Page Not Found',
            error: {
                message: 'The page you requested could not be found.'
            }
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});