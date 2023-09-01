const { Sequelize } = require('sequelize');

const connect = async () => {
    const sequelize = new Sequelize('basicproject2', 'root', '1234', {
        host: 'localhost',
        dialect: "mariadb"
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { connect }