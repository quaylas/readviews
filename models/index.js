const User = require('./User');
const Comment = require('./Comment');
const Review = require('./Review');
const Book = require('./Book.js');
const Vote = require('./Vote.js');

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
    foreignKey: 'User_id',
    onDelete: 'SET NULL'
});

Review.belongsToMany(User, {
    through: Vote,
    as: 'voted_reviews',
    foreignKey: 'Review_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'User_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Review, {
    foreignKey: 'Review_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'User_id'
});

Review.hasMany(Vote, {
    foreignKey: 'Review_id'
});

Comment.belongsTo(User, {
    foreignKey: 'Review_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Review, {
    foreignKey: 'Comment_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'User_id',
    onDelete: 'SET NULL'
});

Review.hasMany(Comment, {
    foreignKey: 'Review_id'
});

 //Book relations 

Book.hasMany(Review, {
    foreignKey: 'book_id'
});

Review.belongsTo(Book, {
    foreignKey: 'book_id'
});








module.exports = { User, Review, Vote,  Book, Comment };


