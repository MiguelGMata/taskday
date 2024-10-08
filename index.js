const express = require('express');
require('express-async-errors');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    origin: 'https://taskday-kappa.vercel.app'
}));
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
//manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Config port

app.listen(PORT, () => {
    console.log(`server port: ${PORT}`);
});
