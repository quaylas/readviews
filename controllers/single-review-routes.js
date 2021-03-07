const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Vote, Comment, Review, Book } = require('../models');


// get one review
router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
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
                model: Vote,
                attributes: ["id", "user_id", "review_id"]
            },
            {
                model: Comment,
                attributes: ['id','comment_text','user_id','created_at'], 
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
        if (dbReviewData) {
        const review = dbReviewData.get({ plain: true });
       console.log(review);
        res.render('single-review', {
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