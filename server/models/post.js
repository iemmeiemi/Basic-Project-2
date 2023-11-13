'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
            Post.belongsTo(models.Post, { foreignKey: 'shareFrom', targetKey: 'id' });
        }
    }
    Post.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            caption: DataTypes.TEXT,
            hashTag: DataTypes.STRING,
            postViewer: {
                type: DataTypes.ENUM(['Only me', 'Friends', 'Everyone']),
                allowNull: false,
                defaultValue: 'Everyone',
            },
            images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
            videos: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
            likes: {
                type: DataTypes.ARRAY({
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                }),
                defaultValue: [],
            },
            shareFrom: DataTypes.UUID,
            userId: {
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
            modelName: 'Post',
            timestamps: true,
            paranoid: true,
        },
    );
    return Post;
};
