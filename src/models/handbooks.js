'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Handbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Handbook.belongsTo(models.Type_Of_Handbook, { foreignKey: 'typeID', targetKey: 'id', as: 'typeOfHandbook'})
    }
  };
  Handbook.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    typeID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Handbook',
  });
  return Handbook;
};