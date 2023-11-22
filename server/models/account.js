'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Account.belongsTo(models.User, { foreignKey: 'id', targetKey: 'id' });
        }
    }
    Account.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            backgroundImage: {
                type: DataTypes.STRING,
                defaultValue:
                    'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
            },
            biography: DataTypes.STRING,
            studyAt: DataTypes.STRING,
            workingAt: DataTypes.STRING,
            address: DataTypes.STRING,
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Account',
            timestamps: true,
            paranoid: true, 
        },
    );
    return Account;
};
