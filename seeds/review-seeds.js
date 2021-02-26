const Review = require('../models');

const reviewdata = [
    {
        user_id: 1,
        book_id: 1,
        review_title: 'Love Alfred',
        review_text: 'I just can\'t get over how excellent lord tennyson is'
    },
]

const seedReviews = () => Book.bulkCreate(reviewData);

module.exports = seedReviews;