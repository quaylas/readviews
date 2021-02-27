const sequelize = require('../config/connection');
const { Book } = require('../models');

const bookdata = [
    {
        title: 'Ring out, wild bells',
        cover: 'http://covers.openlibrary.org/b/id/5776310-S.jpg',
        author: 'Alfred, Lord Tennyson'

    },
    {
        title: 'Lord of the Rings',
        cover: 'http://covers.openlibrary.org/b/id/1454705-S.jpg',
        author: 'J.R.R Tolkien'

    },
    {
        title: 'Mariel of Redwall',
        cover: 'http://covers.openlibrary.org/b/id/9088859-S.jpg',
        author: 'Brian Jacques'

    },
    {
        title: 'A Warrior\'s Death',
        cover: 'http://covers.openlibrary.org/b/id/2766106-S.jpg',
        author: 'SFX Fantasy'

    }
];

const seedBooks = () => Book.bulkCreate(bookdata);

module.exports = seedBooks;