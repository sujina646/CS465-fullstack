const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const travelRoutes = require('./app_server/routes/travel');
app.use('/travel', travelRoutes);

app.get('/', (req, res) => {
    res.redirect('/travel');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});