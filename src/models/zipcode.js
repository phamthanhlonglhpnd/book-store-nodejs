'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zipcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Zipcode.belongsTo(models.User, { foreignKey: 'userID', targetKey: 'id'} )
    }
  };
  Zipcode.init({
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    street: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    typeID: DataTypes.STRING,
    isDefault: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Zipcode',
  });
  return Zipcode;
};