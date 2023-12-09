'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Forum extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Forum.belongsTo(models.Organization, { foreignKey: 'OrganizationId', targetKey: 'id', as: 'organization' });
            Forum.belongsTo(models.User, { foreignKey: 'ownerId', targetKey: 'id', as: 'owner' });
        }
    }
    Forum.init(
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
            description: DataTypes.STRING,
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg',
            },
            role: {
                type: DataTypes.ENUM(['owner','admin','member']),
                defaultValue: 'member',
            },
            // NẾU DO TỔ CHỨC TẠO THÌ:
            OrganizationId: { 
                type: DataTypes.UUID,
                references: {
                    model: 'Organizations',
                    key: 'id',
                },
            },
            // NẾU DO CÁ NHÂN NGƯỜI DÙNG TẠO THÌ:
            ownerId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Forum',
            timestamps: true,
            paranoid: true, 
        },
    );
    return Forum;
};
