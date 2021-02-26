const Review = require('../models');

const reviewdata = [
    {
        user_id: 1,
        book_id: 1,
        book_Title: 'Ring out, wild bells',
        author: 'Alfred, Lord Tennyson'
    }
]

const seedReviews = () => Book.bulkCreate(reviewData);

module.exports = seedReviews;