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
      background: {
        allowNull: true,
        type: Sequelize.STRING
      },
      body: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mouth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tokenId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      eyes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      head_gear: {
        allowNull: true,
        type: Sequelize.STRING
      },
      image: {
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