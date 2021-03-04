const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User, Comment, Vote, Book} = require('../models');
const withAuth = require('../utils/auth');

//get all Reviews for the dashboard
router.get('/', (req, res) => {
    console.log(req.session);
    console.log('getting reviews');
    console.log('======================');
    Review.findAll({
      where: {
        user_id: req.session.user_id
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
          }
        ]
    })
      .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }));
        res.render('dashboard', { reviews, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
    attributes: [
        'id',
        'review_title',
        'review_text',
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
        
        res.render('edit-review', {
            review,
            loggedIn: true
        });
        } else {
        res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
    });

  module.exports = router;