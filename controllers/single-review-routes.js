const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Vote, Comment, Review, Book } = require('../models');
const voted = require('../utils/voted');


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
        ],
        include: [
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
            },
            {
                model: Vote,
                attributes:['id','user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbReviewData => {
        if (dbReviewData) {
        const review = dbReviewData.get({ plain: true });
        let upV = false;
        for(i=0;i<review.votes.length;i++){
            if(review.votes[i].user_id === req.session.user_id){
                upV = true;
                break;
            }
        }
        res.render('single-review', {
            review,
            upvoted: upV,
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