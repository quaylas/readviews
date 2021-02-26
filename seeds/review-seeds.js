const Review = require('../models');

const reviewdata = [
    {
        review_title: 'Love Alfred',
        review_text: 'I just can\'t get over how excellent lord tennyson is. I am not accepting comments at this time.', 
        is_public: true,
        comments_enabled: false,
        user_id: 1,
        book_id: 1,
    },
    {
        review_title: 'TOO MANY HOBBITS',
        review_text: 'SRSL what even is with all the breakfasts? and the stories? and the pipe-weed????', 
        is_public: true,
        comments_enabled: true,
        user_id: 2,
        book_id: 2,
    },
    {
        review_title: 'THANK GOD FOR Brian Jacques',
        review_text: 'Love everything this guy does srsly', 
        is_public: true,
        comments_enabled: true,
        user_id: 1,
        book_id: 2,
    },
    {
        review_title: 'Confusing all the way down',
        review_text: 'I was looking for the cookbook and idk what this is.', 
        is_public: true,
        comments_enabled: true,
        user_id: 2,
        book_id: 3,
    },
]

const seedReviews = () => Book.bulkCreate(reviewData);

module.exports = seedReviews;