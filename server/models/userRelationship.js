'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserRelationship extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserRelationship.belongsTo(models.User, { foreignKey: 'userId1', targetKey: 'id' });
            UserRelationship.belongsTo(models.User, { foreignKey: 'userId2', targetKey: 'id' });
        }
    }
    UserRelationship.init(
        {
            userId1: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            userId2: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            friend: {
                type: DataTypes.ENUM([
                    'pending_st_nd',
                    'pending_nd_st',
                    'friends',
                    'block_st_nd',
                    'block_nd_st',
                    'block_both',
                ]),

                allowNull: true,
            },
            follow: { type: DataTypes.ENUM(['st_fl_nd', 'nd_fl_st', 'fl_both']), allowNull: true },
        },
        {
            sequelize,
            modelName: 'UserRelationship',
            timestamps: true,
        },
    );
    return UserRelationship;
};
