const express = require('express');
const connectBD = require('./config/bd');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.route');
const hotel = require('./routes/hotel.route');



dotenv.config();
const app = express();
connectBD();

app.use(express.json());

app.use('/api/auth',authRoute);

app.use('/api/hotel',hotel);

app.get('/',(req,res)=>{
    res.send('Bienvenue sur mon serveur')
} );

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`serveur demaré sur http://localhost:${PORT}`)
})

