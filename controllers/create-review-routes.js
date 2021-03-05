const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

// get create-review page
router.get('/', (req, res)=> {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    const book = req.query;
    res.render('create-review', {book, loggedIn: req.session.loggedIn}); 
});

module.exports = router;