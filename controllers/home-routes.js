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

// get signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// get dashboard page
router.get('/dashboard', (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('dashboard');
})
module.exports = router;