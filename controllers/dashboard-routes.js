const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User, Comment, Vote, Book} = require('../models');
const withAuth = require('../utils/auth');

//get all Reviews for the dashboard
router.get('/dashboard/', withAuth, (req, res) => {
    console.log(req.session);
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
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { Review, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;