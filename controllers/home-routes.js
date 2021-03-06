const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Book, Vote, Comment } = require('../models');

// render homepage with reviews
router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Review.findAll({
        where: {
        is_public: true
        },
        attributes: [
            'id',
            'review_title',
            'review_text',
            'is_public',
            'user_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE id = vote.review_id)'),'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'review_id', 'user_id', 'created_at'],
                include: {
                model: User,
                attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Book,
                attributes: ["title", "author"]
            }
            ]
        })
        .then(dbReviewData => {
            const reviews = dbReviewData.map(review => review.get({ plain: true }));
            console.log(reviews)
            res.render('homepage', { reviews, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
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


module.exports = router;