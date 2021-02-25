const User = require('./User');
const Comment = require('./Comment');
const Review = require('./Review');
const Book = require('./Book.js')
const Vote = require('./Vote.js')

//data relations 

User.hasMany(Review, {
    foreignKey: 'User_id'
});

Review.belongsTo(User, {
    foreignKey: 'User_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Review, {
    through: Vote,
    as: 'voted_reviews',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Review.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Review, {
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Review.hasMany(Vote, {
    foreignKey: 'review_id'
});

Comment.belongsTo(User, {
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Review, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id'
});

 //Book relations 

 Book.hasMany(Review, {
     foreignKey: 'book_id'
 });

 Review.belongsTo(Book, {
     foreignKey: 'book_id'
 });








module.exports = { User, Review, Vote,  Book, Comment };


