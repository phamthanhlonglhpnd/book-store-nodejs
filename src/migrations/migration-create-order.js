'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerID: {
        type: Sequelize.INTEGER
      },
      bookID: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      statusID: {
        type: Sequelize.STRING
      },
      paymentID: {
        type: Sequelize.INTEGER
      },
      storeID: {
        type: Sequelize.INTEGER
      },
      address_receiver: {
        type: Sequelize.STRING
      },
      name_receiver: {
        type: Sequelize.STRING
      },
      phone_receiver: {
        type: Sequelize.STRING
      },
      shipping_fee: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};