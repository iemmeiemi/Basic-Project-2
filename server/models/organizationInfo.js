'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrganizationInfo.belongsTo(models.Organization, { foreignKey: 'id', targetKey: 'id' });
        }
    }
    OrganizationInfo.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Organizations',
                    key: 'id',
                },
            },
            backgroundImage: {
                type: DataTypes.STRING,
                defaultValue:
                    'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
            },
            description: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            website: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'OrganizationInfo',
            timestamps: true,
            paranoid: true, 
        },
    );
    return OrganizationInfo;
};
