const express = require('express');
require('express-async-errors');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const { notFoundHandler, errorLogger, errorHandler } = require('./middlewares');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// Crear una instancia de Sequelize
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
// Probar la conexión
sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Unable to connect to the database:', err));

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello in api</h1>');
})

app.use('/api', apiRoutes);

// Servir archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, 'client/build')));

// Manejar todas las rutas que no son de la API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//Errors
app.use('*', notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);


//Config port
app.listen(PORT, () => {
    console.log(`server port: ${PORT}`);
});


// Exportar configuración
module.exports = sequelize;