'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Type.belongsTo(models.Book, { foreignKey: 'bookID', targetKey: 'id' });
      Book_Type.belongsTo(models.Type_Of_Handbook, { foreignKey: 'typeID', targetKey: 'id', as: 'typeOfBook' })
    }
  };
  Book_Type.init({
    bookID: DataTypes.INTEGER,
    typeID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book_Type',
  });
  return Book_Type;
};