const User = require('./User');
const Comment = require('./Comment');
const Review = require('./Review');
const Book = require('./Book');
const Vote = require('./Vote');

//data relations 

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
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
    as: 'voted_reviews',
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
    foreignKey: 'user_id', //changed from Review_id
    onDelete: 'SET NULL'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id', //changed from comment_id
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


