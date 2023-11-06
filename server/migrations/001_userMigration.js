'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.literal('extract(epoch from now())::integer'),
            },
            username: { type: Sequelize.STRING, allowNull: true, unique: true },
            firstName: { type: Sequelize.STRING, allowNull: false },
            lastName: { type: Sequelize.STRING, allowNull: false },
            fullName: { type: Sequelize.STRING, allowNull: false },
            gender: {
                type: Sequelize.ENUM(['Male', 'Female', 'Undetermined']),
                defaultValue: 'Undetermined',
            },
            avatar: {
                type: Sequelize.STRING,
                defaultValue: 'https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg',
            },
            email: { type: Sequelize.STRING, allowNull: false },
            password: { type: Sequelize.STRING, allowNull: false },
            refreshToken: Sequelize.STRING,
            passwordChangedAt: Sequelize.STRING,
            passwordResetToken: Sequelize.STRING,
            passwordResetExprides: Sequelize.BIGINT,
            interestedUsers: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
            isBlocked: { type: Sequelize.BOOLEAN, defaultValue: false },
            role: { type: Sequelize.ENUM(['user', 'admin']), defaultValue: 'user' },
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
        await queryInterface.dropTable('User');
    },
};
