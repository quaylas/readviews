const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Vote, Comment, Review, Book } = require('../../models');
const withAuth =  require('../../utils/auth');

// get all votes
router.get('/', (req, res) => {
    console.log('---------------');
    Vote.findAll({
        attributes: [
            'id',
            'review_id',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Review, 
                attributes:['review_title']
            }
        ]
    })
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;