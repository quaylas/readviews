const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model{
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}
    

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      }
    },
    {
      hooks: {
        
          beforeCreate(newUserData) {
            new Promise(function(resolve, reject){
          
          bcrypt.hash(newUserData.password, 10)
          .then(newpassword => {
            newUserData.password = newpassword;
            Promise.resolve
         }).catch(err => console.log(err))  
        
          return newUserData;

         })
        },
  
         beforeUpdate(updatedUserData) {
          
          new Promise(function(resolve, reject){
         
          bcrypt.hash(updatedUserData.password, 10)
          .then(newpassword => {
            updatedUserData.password = newpassword;
            Promise.resolve
          })
          return updatedUserData;

          }).catch(err => console.log(err))  
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  )
  
  module.exports = User;