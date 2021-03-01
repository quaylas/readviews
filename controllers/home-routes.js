const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log('Welcome Home');
    res.render('homepage',  {
        loggedIn: req.session.loggedIn
    });
});

// get login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
