'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stocks', {
            email: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.STRING,

            },
            VocaCola: {
                type: Sequelize.INTEGER
            },
            Yecher: {
                type: Sequelize.INTEGER
            },
            HindPetroleum: {
                type: Sequelize.INTEGER
            },
            VI: {
                type: Sequelize.INTEGER
            },
            LyccaLabs: {
                type: Sequelize.INTEGER
            },
            Abibas: {
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
        await queryInterface.dropTable('stocks');
    }
};
