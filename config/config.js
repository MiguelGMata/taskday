require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule: require('mysql2')
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err));

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
