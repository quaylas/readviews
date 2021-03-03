const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Vote, Comment, Review, Book } = require('../../models');
const withAuth =  require('../../utils/auth');

// get all reviews, sorted by most recent
router.get('/', (req, res) => {
    console.log('---------------');
    Review.findAll({
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
                model: User,
                attributes: ['username']
            }
        ],
        order: [['created_at', 'DESC']]
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

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
            }
        ]
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({ message: 'No review found with this id!'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get all reviews for one user 
router.get('/user/:query', (req, res) => {
    Review.findAll({
        where: {
            user_id: {
                [Op.substring]: req.params.query
            }
        },
        attributes: [
            'id',
            'title',
            'cover',
            'author',
            [sequelize.literal('(SELECT COUNT(*) FROM review WHERE book.id = review.book_id)'),'review_count']
        ],
        order: [['title','ASC']]
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({message: 'We didn\'t find any reviews for that user!'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create review
router.post('/',  /*withAuth, */ (req, res)=> {
    // expects {review_title: "this is the title", review_text: "this is the review", user_id: 1, book_id: 1}
    Review.create({
        review_title: req.body.review_title,
        review_text: req.body.review_text,
        user_id: req.session.user_id,
        book_id: req.body.book_id, 
        is_public: req.body.is_public,
        comments_enabled: req.body.comments_enabled
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// upvote review
router.put('/upvote', (req, res)  => {
    // expects {user_id:, review_id}
    Review.upvote(req.body,  { Vote, Review, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update review
router.put('/:id', withAuth, (req, res) => {
    // expects either 'title:' or 'text:' or both
    if(req.body.title && req.body.text) {
        Review.update(
            {
                review_title: req.body.title,
                review_text: req.body.text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(dbReviewData => {
            if(!dbReviewData) {
                res.status(404).json({ message: 'No review found with this id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    if(req.body.title && !req.body.text) {
        Review.update(
            {
                review_title: req.body.title
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(dbReviewData => {
            if(!dbReviewData) {
                res.status(404).json({ message: 'No review found with this id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    if(req.body.text && !req.body.title) {
        Review.update(
            {
                review_text: req.body.text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(dbReviewData => {
            if(!dbReviewData) {
                res.status(404).json({ message: 'No review found with this id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// delete review
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({message:'No review found with that id!'});
            return;
        }
        res.json(dbReviewData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;