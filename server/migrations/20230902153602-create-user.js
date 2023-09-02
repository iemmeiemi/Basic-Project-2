'use strict';

// ==================================================================================
// = ALL FILE Ở FOLDER MIGRATION KHÔNG ẢNH HƯỞNG GÌ TỚI CODE, NÓ NHƯ MỘT NHẬT KÍ ĐỂ
// = XÓA CŨNG ĐƯỢC NHƯNG MÀ ĐỂ VẬY CHO ĐÚNG CHUẨN
// ==================================================================================

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};