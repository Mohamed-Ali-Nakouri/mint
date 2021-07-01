'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NFTs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      race: {
        type: Sequelize.STRING
      },
      tier: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      primary_trait: {
        type: Sequelize.STRING
      },
      secondary_trait: {
        type: Sequelize.STRING
      },
      isMinted: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('NFTs');
  }
};