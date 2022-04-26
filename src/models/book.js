'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Book.belongsToMany(models.Type_Of_Handbook, { through: models.Book_Type });
      Book.hasMany(models.Book_Type, { foreignKey: 'bookID' });
      // Book.belongsToMany(models.Author, { through: models.Book_Author });
      Book.hasMany(models.Book_Author, { foreignKey: 'bookID' });
      Book.hasMany(models.Cart, { foreignKey: 'bookID' });
      Book.belongsTo(models.Language, { foreignKey: 'languageID', targetKey: 'id', as: 'language' });
      Book.belongsTo(models.Publisher, { foreignKey: 'publisherID', targetKey: 'id', as: 'publisher' });
      Book.belongsTo(models.Store, { foreignKey: 'storeID', targetKey: 'id', as: 'store' });
      Book.hasMany(models.Order, { foreignKey: 'bookID' });

    }
  };
  Book.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    page: DataTypes.INTEGER,
    price: DataTypes.STRING,
    dimension: DataTypes.STRING,
    count: DataTypes.INTEGER,
    publisherID: DataTypes.INTEGER,
    storeID: DataTypes.INTEGER,
    languageID: DataTypes.INTEGER,
    view: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
    best_seller: DataTypes.INTEGER,
    publish_date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};