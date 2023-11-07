'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ForumMember extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ForumMember.belongsTo(models.Forum, { foreignKey: 'forumId', targetKey: 'id' });
            ForumMember.belongsTo(models.User, { foreignKey: 'memberId', targetKey: 'id' });
        }
    }
    ForumMember.init(
        {
            forumId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Forums',
                    key: 'id',
                },
            },
            memberId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            role: {
                type: DataTypes.ENUM(['admin','member']),
                defaultValue: 'member',
            }
        },
        {
            sequelize,
            modelName: 'ForumMember',
            timestamps: true,
            paranoid: true, 
        },
    );
    return ForumMember;
};
