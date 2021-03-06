'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Transaction, { foreignKey: 'transactionID', targetKey: 'id' });
      Order.belongsTo(models.Book, { foreignKey: 'bookID', targetKey: 'id' });
    }
  };
  Order.init({
    transactionID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.STRING,
    storeID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};