'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Certificate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Certificate.belongsTo(models.User, { foreignKey: 'receiverId', targetKey: 'id', as: 'receiver' });
            Certificate.belongsTo(models.Activity, { foreignKey: 'activityId', targetKey: 'id', as: 'activity' });
        }
    }
    Certificate.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            activityAt: DataTypes.DATEONLY,
            receiverId: {
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
        },
        {
            sequelize,
            modelName: 'Certificate',
            timestamps: true,
            paranoid: true,
        },
    );
    return Certificate;
};
