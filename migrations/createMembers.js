'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
        id:{
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
            type:Sequelize.INTEGER,

        },
      kid: {
        type: Sequelize.INTEGER,
        unique:true,
      },
      name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      cnumber: {
        type: Sequelize.STRING
      },
      college: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      department:{
        type: Sequelize.STRING
      },
      password:{
          type:Sequelize.STRING
      }
      ,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
