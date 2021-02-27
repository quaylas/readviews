const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Vote, Comment, Review, Book } = require('../../models');

// get all books
router.get('/', (req,res) => {
    console.log('---------------');
    Book.findAll({
        attributes: [
            'id',
            'title',
            'cover',
            'author',
            [sequelize.literal('(SELECT COUNT(*) FROM review WHERE book.id = review.book_id)'),'review_count']
        ],
        order: [['author','ASC']]

    })
    .then(dbBookData => res.json(dbBookData))
    .catch(err  => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one book
router.get('/:id', (req, res) => {
    Book.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'cover',
            'author'
        ], 
        include: [
            {
                model: Review,
                attributes: ['id','review_title','review_text','is_public','user_id','created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE id = vote.review_id)'),'vote_count']],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(404).json({ message: 'No book found with this id!'});
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create book
router.post('/', (req, res) => {
    // expects title: 'Lord of The Rings', cover: http://somecover.url.com, author: 'J.R.R. Tolkien'
    Book.create({
        title: req.body.title,
        cover:  req.body.cover,
        author: req.body.author
    })
    .then(dbBookData => res.json(dbBookData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update book title (honestly not sure we need this)
router.put('/:id', (req, res) => {
    Book.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(404).json({ message: 'No book found with  this id' });
            return;
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete book (honestly not sure we need this either but its probably best to have)
router.delete('/:id', (req,res) => {
    Book.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(404).json({ message: 'No book found with this id' });
            return;
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;