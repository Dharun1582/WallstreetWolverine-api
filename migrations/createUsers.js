'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      kid: {
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      college: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      dept: {
        type: Sequelize.STRING
      },
      pwdhash: {
        type: Sequelize.STRING
      },
      cegian: {
        type: Sequelize.BOOLEAN
      },
      salt: {
        type: Sequelize.STRING
      },
      vsalt: {
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
    await queryInterface.dropTable('users');
  }
};
