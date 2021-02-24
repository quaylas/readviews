const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {

}

Book.init(
{
    id: {
    type: DataTypes. INTEGER,
    allowNull: false,
    
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isURL: true
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false

    },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'Review'



    }
      
);
module.exports = Book
