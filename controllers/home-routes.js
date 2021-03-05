const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment, Book} = require('../models');


router.get('/', (req, res) => {
    console.log(req.session);
    console.log('getting reviews');
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
          }
        ]
    })
      .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }));
        res.render('homepage', { reviews, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


/* old code 
router.get('/', (req, res) => {
    console.log('Welcome Home');
    res.render('homepage',  {
        loggedIn: req.session.loggedIn
    });
}); */

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
// router.get('/dashboard', (req, res) => {
//     if(!req.session.loggedIn) {
//         console.log('redirect');
//         res.redirect('/login');
//         return;
//     }
//     console.log('wrong dashboard!');
//     res.render('dashboard');
// });

// get create-review page
router.get('/create-review', (req, res)=> {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('create-review');
});


module.exports = router;