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
    }
  };
  Order.init({
    customerID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.STRING,
    statusID: DataTypes.STRING,
    paymentID: DataTypes.INTEGER,
    storeID: DataTypes.INTEGER,
    address_receiver: DataTypes.STRING,
    name_receiver: DataTypes.STRING,
    phone_receiver: DataTypes.STRING,
    shipping_fee: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};