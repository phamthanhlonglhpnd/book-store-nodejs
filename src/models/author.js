'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Author.belongsToMany(models.Book, { through: models.Book_Author });
      Author.hasMany(models.Book_Author, { foreignKey: 'authorID' })
    }
  };
  Author.init({
    name: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};