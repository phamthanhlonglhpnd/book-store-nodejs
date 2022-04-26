'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lading_code: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING
      },
      statusID: {
        type: Sequelize.STRING
      },
      paymentID: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions');
  }
};