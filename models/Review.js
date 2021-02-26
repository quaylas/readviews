const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {
static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      review_id: body.review_id
    }).then(() => {
      return Review.findOne({
        where: {
          id: body.review_id
        },
        attributes: [
          'id',
          'book_title',
          'book_cover',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'vote_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'user_id', 'review_id', 'created_at'],
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
        review_title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [50]
          }
        },
        review_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        // is_public: {
        //   type: DataTypes.BOOLEAN,
        //   allowNull: false,
        //   defaultValue: true
        // },
        // comments_enabled: {
        //   type: DataTypes.BOOLEAN,
        //   allowNull: false,
        //   defaultValue: true
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        book_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'book',
            key: 'id'
          }
        },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'review'
    }

);

module.exports = Review;