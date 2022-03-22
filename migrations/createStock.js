'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Stock', {
            kid: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.STRING,

            },
            CokaCula: {
                type: Sequelize.INTEGER
            },
            HettanPetroleum: {
                type: Sequelize.INTEGER
            },
            Vedophene: {
                type: Sequelize.INTEGER
            },
            Abibas: {
                type: Sequelize.INTEGER
            },
            LycaLabs: {
                type: Sequelize.INTEGER
            },
            Yechier: {
                type: Sequelize.INTEGER
            },
            Wallet: {
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
        await queryInterface.dropTable('contacts');
    }
};
