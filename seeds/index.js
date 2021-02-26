const seedUsers = require('./user-seeds');
const seedBooks = require('./book-seeds');
const seedReviews = require('./review-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: false });
    console.log('------------------');
    await seedUsers();
    console.log('------------------');
    
    await seedBooks();
    console.log('------------------');

    await seedReviews();
    console.log('------------------');

    await seedComments();
    console.log('------------------');

    await seedVotes();
    console.log('------------------');

    process.exit(0);
};

seedAll();