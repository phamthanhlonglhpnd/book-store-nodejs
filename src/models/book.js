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
    active_count: DataTypes.INTEGER,
    publisherID: DataTypes.INTEGER,
    storeID: DataTypes.INTEGER,
    languageID: DataTypes.INTEGER,
    view: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
    best_seller: DataTypes.INTEGER,
    discountID: DataTypes.INTEGER,
    publish_date: DataTypes.INTEGER,
    publish_month: DataTypes.INTEGER,
    publish_year: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};