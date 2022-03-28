'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transactions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,

            },
            company: {
                type: Sequelize.STRING
            },
            flag: {
                type: Sequelize.STRING
            },
            number: {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transactions');
    }
};
