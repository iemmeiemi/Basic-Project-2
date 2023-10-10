module.exports = {
    "development": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABASE_HOST,
      "dialect": "postgres",
      "logging": false,
      dialectOptions: {
        useUTC: false, //for reading from database
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
          return next()
        },
      },
      timezone: "+07:00"
    },
    "test": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABAESE_HOST,
      "dialect": process.env.DATABASE_DIALECT,
      "logging": false,
      "timezone": "+07:00"
    },
    "production": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABAESE_HOST,
      "dialect": process.env.DATABASE_DIALECT,
      "logging": false,
      "timezone": "+07:00"
    }
  }
  