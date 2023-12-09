'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationMember extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrganizationMember.belongsTo(models.Organization, { foreignKey: 'OrganizationId', targetKey: 'id', as: 'organization' });
            OrganizationMember.belongsTo(models.User, { foreignKey: 'memberId', targetKey: 'id', as: 'member' });
        }
    }
    OrganizationMember.init(
        {
            OrganizationId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Organizations',
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
            modelName: 'OrganizationMember',
            timestamps: true,
            paranoid: true, 
        },
    );
    return OrganizationMember;
};
