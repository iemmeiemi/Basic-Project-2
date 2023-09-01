const { Sequelize } = require('sequelize');

const connect = async () => {
    const dbName = process.env.DATABASE_NAME;
    const username = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const sequelize = new Sequelize(dbName, username, password, {
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