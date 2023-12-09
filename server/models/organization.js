'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Organization.belongsTo(models.User, { foreignKey: 'ownerId', targetKey: 'id', as: 'owner' });
        }
    }
    Organization.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg',
            },
            groupType: {
                type: DataTypes.ENUM(['Community', 'Company', 'Club', 'Group', 'Shcool']),
                allowNull: false,
                defaultValue: 'Community',
            },
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Organization',
            timestamps: true,
            paranoid: true,
        },
    );
    return Organization;
};
