'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Author.belongsTo(models.Book, { foreignKey: 'bookID', targetKey: 'id', });
      Book_Author.belongsTo(models.Author, { foreignKey: 'authorID', targetKey: 'id', as: 'authorOfBook'})
    }
  };
  Book_Author.init({
    bookID: DataTypes.INTEGER,
    authorID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book_Author',
  });
  return Book_Author;
};