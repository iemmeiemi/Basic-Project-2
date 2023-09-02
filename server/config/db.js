const { Sequelize } = require('sequelize');

let sequelize = null;

    const dbName = process.env.DATABASE_NAME;
    const username = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    sequelize = new Sequelize(dbName, username, password, {
        host: 'localhost',
        dialect: "mariadb"
    });

module.exports = { sequelize }