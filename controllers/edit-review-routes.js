const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Book, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get edit-review page
router.get('/:id', withAuth, (req, res) => {
    Review.findByPk(req.params.id, {
    attributes: [
        'id',
        'review_title',
        'review_text',
        'book_id',
        'is_public',
        'comments_enabled',
        'created_at'
    ],
    include: [
        {
        model: Book,
        attributes:['title']
        },
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
        }
    ]
    })
    .then(dbReviewData => {
        if (dbReviewData) {
        const review = dbReviewData.get({ plain: true });
        console.log(review);
        res.render('edit-review', {
            review,
            loggedIn: true
        });
        } else {
        res.status(404).json({message: 'No review found with that ID!'}).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;