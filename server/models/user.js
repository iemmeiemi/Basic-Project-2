'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.literal('extract(epoch from now())::integer'),
            },
            username: { type: DataTypes.STRING, allowNull: true, unique: true },
            firstName: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: false },
            fullName: { type: DataTypes.STRING, allowNull: false },
            gender: {
                type: DataTypes.ENUM(['Male', 'Female', 'Undetermined']),
                defaultValue: 'Undetermined',
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg',
            },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            refreshToken: DataTypes.STRING,
            passwordChangedAt: DataTypes.STRING,
            passwordResetToken: DataTypes.STRING,
            passwordResetExprides: DataTypes.BIGINT,
            interestedUsers: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
            isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
            role: { type: DataTypes.ENUM(['user', 'admin']), defaultValue: 'user' },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: true,
            paranoid: true, 
        },
    );
    return User;
};
