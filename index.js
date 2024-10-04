const express = require('express');
const cors = require('cors');
const app = express();


//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.json({ msm: 'Hello in api' });
})
//Config port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server port: ${PORT}`);
});
