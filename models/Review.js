const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {
static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      review_Id: body.review_Id
    }).then(() => {
      return Review.findOne({
        where: {
          id: body.review_Id
        },
        attributes: [
          'id',
          'book_Title',
          'book_Cover',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.Id = vote.review_Id)'), 'vote_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'User_id', 'review_Id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        book_Title: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
          
    },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'Review'
    }
 

);

module.exports = Review;