const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment, Book, Vote } = require('../models');

// get reviews for user dashboard
router.get('/', /*withAuth,*/ (req, res) => {
    console.log('------------------');
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'review_title',
            'review_text',
            'is_public',
            'comments_enabled',
            'book_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE id = vote.review_id)'), 'vote_count']
        ], 
        include: [
            {
                model: Book,
                attributes: [
                    'id',
                    'title',
                    'cover',
                    [sequelize.literal('(SELECT COUNT(*) FROM review WHERE id = review.book_id)'), 'review_count']
                ],
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text', 'review_id', 'user_id', 'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({message: 'We\'re having trouble loading your review list'});
            return;
        }
        const reviews = dbReviewData.map(review => review.get({ plain: true }));
        res.render('dashboard', { reviews, loggedIn: true });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;