const sequelize = require('../config/connection');
const { Vote } = require('../models');

const votedata = [
    {
        user_id: 2,
        review_id: 2
    },
    {
        user_id: 2,
        review_id: 4
    },
    {
        user_id: 3,
        review_id: 4
    },
    {
        user_id: 3,
        review_id: 2
    },
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;

