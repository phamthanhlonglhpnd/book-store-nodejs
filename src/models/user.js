'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: 'userID' });
      User.hasMany(models.Zipcode, { foreignKey: 'userID'});
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleID: DataTypes.STRING,
    image: DataTypes.TEXT,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};