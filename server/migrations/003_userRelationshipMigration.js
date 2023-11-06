'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserRelationship', {
            userid1: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "User",
                    key: 'id',
                },
            },
            userid2: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "User",
                    key: 'id',
                },
            },
            friend: {
                type: Sequelize.ENUM([
                    'pending_st_nd',
                    'pending_nd_st',
                    'friends',
                    'block_st_nd',
                    'block_nd_st',
                    'block_both',
                ]),
                allowNull: false,
            },
            follow: { type: Sequelize.ENUM(['st_fl_nd', 'nd_fl_st', 'fl_both']), allowNull: false },
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
        await queryInterface.dropTable('UserRelationship');
    },
};
