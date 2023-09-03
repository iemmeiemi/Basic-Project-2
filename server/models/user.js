'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: { type: DataTypes.STRING, allowNull: true, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: false},
    lastName: { type: DataTypes.STRING, allowNull: false},
    gender: { 
      type: DataTypes.ENUM(['Male', 'Female', 'Undetermined']), 
      defaultValue: "Undetermined"
    }, 
    avatar: { 
      type: DataTypes.STRING, 
      defaultValue: "https://img.hoidap247.com/picture/question/20200508/large_1588936738888.jpg" 
    },
    backgroundimage: { 
      type: DataTypes.STRING, 
      defaultValue: "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" 
    },
    email: { type: DataTypes.STRING, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.ENUM(['user', 'admin']), defaultValue: 'user'},
    isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    refreshToken: DataTypes.STRING,
    passwordChangedAt: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExprides: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};