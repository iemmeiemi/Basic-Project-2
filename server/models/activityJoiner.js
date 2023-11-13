'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ActivityJoiner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ActivityJoiner.belongsTo(models.User, { foreignKey: 'joinerId', targetKey: 'id' });
            ActivityJoiner.belongsTo(models.Activity, { foreignKey: 'activityId', targetKey: 'id' });
        }
    }
    ActivityJoiner.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            joinerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            activityId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Activities',
                    key: 'id',
                },
            },
            role: {
                type: DataTypes.ENUM(['admin','joiner']),
                defaultValue: 'joiner',
            }
        },
        {
            sequelize,
            modelName: 'ActivityJoiner',
            timestamps: true,
            paranoid: true,
        },
    );
    return ActivityJoiner;
};
