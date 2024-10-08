require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.USER,
        "password": process.env.PASS,
        "database": process.env.NAME,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.USER,
        "password": process.env.PASS,
        "database": process.env.NAME,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        logging: console.log,
    }
}
