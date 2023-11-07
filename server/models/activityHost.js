'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ActivityHost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ActivityHost.belongsTo(models.Organization, { foreignKey: 'organizationId', targetKey: 'id' });``
            ActivityHost.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
            ActivityHost.belongsTo(models.Activity, { foreignKey: 'activityId', targetKey: 'id' });
        }
    }
    ActivityHost.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            organizationId: {
                type: DataTypes.UUID,
                references: {
                    model: 'Organizations',
                    key: 'id',
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            activityId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Activities',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'ActivityHost',
            timestamps: true,
            paranoid: true,
        },
    );
    return ActivityHost;
};
