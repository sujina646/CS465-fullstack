const travelController = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    travelController
};