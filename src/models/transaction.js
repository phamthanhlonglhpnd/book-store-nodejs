'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.Order, { foreignKey: 'transactionID' });
    }
  };
  Transaction.init({
    lading_code: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    statusID: DataTypes.STRING,
    paymentID: DataTypes.STRING,
    address_receiver: DataTypes.STRING,
    name_receiver: DataTypes.STRING,
    phone_receiver: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};