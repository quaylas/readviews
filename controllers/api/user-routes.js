const router = require('express').Router();
const { User, Vote, Comment, Review } = require('../../models');






 //Create User 
router.post('/', (req, res) => {
    // expects username:, email: , password: 
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//login
router.post('/login', (req, res) => {
    // expects {username: , password:}
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user found with that username!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });


  //Log out
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).json({message: 'you have been logged out'}).end();
      });
    }
    else {
      res.status(404).json({message: 'Something is wrong...'}).end();
    }
  });

// update
router.put('/:id', (req, res) => {
    // expects username: , email:, password:
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Delete 
  router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //find one
  router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'user_id', 'review_title', 'review_text', 'book_id', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
              model: Review,
              attributes: ['book_id'] // might need to reference review title instead
          }
        },
        {
          model: Review,
          attributes: ['id'],
          through: Vote,
          as: 'voted_reviews'
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //find all
  router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }); 

  
  module.exports = router;