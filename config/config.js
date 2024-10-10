require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.USER_DB,
        "password": process.env.PASS_DB,
        "database": process.env.NAME_DB,
        "host": process.env.HOST_DB,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.USER_DB,
        "password": process.env.PASS_DB,
        "database": process.env.NAME_DB,
        "host": process.env.HOST_DB,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "dialectModule": require('mysql2'),
        logging: console.log,
    }
}
