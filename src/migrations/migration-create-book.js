'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      descriptionHTML: {
        type: Sequelize.TEXT
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT
      },
      page: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      dimension: {
        type: Sequelize.STRING
      },
      active_count: {
        type: Sequelize.INTEGER
      },
      publisherID: {
        type: Sequelize.INTEGER
      },
      storeID: {
        type: Sequelize.INTEGER
      },
      languageID: {
        type: Sequelize.INTEGER
      },
      view: {
        type: Sequelize.INTEGER
      },
      like: {
        type: Sequelize.STRING
      },
      best_seller: {
        type: Sequelize.INTEGER
      },
      discountID: {
        type: Sequelize.INTEGER
      },
      publish_date: {
        type: Sequelize.INTEGER
      },
      publish_month: {
        type: Sequelize.INTEGER
      },
      publish_year: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Books');
  }
};