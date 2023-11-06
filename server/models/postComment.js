'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PostComment.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
            PostComment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
        }
    }
    PostComment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            content: DataTypes.TEXT,
            likes: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
            postId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
            },
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
            modelName: 'PostComment',
            timestamps: true,
            paranoid: true,
        },
    );
    return PostComment;
};
