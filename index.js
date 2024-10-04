const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.json({ msm: 'Hello in api' });
})
app.use('/api', apiRoutes);

//Config port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server port: ${PORT}`);
});
