'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_Of_Handbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type_Of_Handbook.hasMany(models.Handbook, {  foreignKey: 'typeID', as:'typeOfHandbook' });
      // Type_Of_Handbook.belongsToMany(models.Book, { through: models.Book_Type });
      Type_Of_Handbook.hasMany(models.Book_Type, { foreignKey: 'typeID' });
    }
  };
  Type_Of_Handbook.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type_Of_Handbook',
  });
  return Type_Of_Handbook;
};