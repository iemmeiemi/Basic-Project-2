'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Account', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            backgroundImage: {
                type: Sequelize.STRING,
                defaultValue:
                    'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
            },
            biography: Sequelize.STRING,
            studyAt: Sequelize.STRING,
            workingAt: Sequelize.STRING,
            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Account');
    },
};
