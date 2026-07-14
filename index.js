const express = require('express');
const cors = require('cors');

require('dotenv').config();

const connectBD = require('./config/bd');

const authRoute = require('./routes/auth.route');
const hotelRoute = require('./routes/hotel.route');
const uploadRoutes = require("./routes/upload");

const app = express();

connectBD();

app.use(express.json({ limit: "10mb" })); // important pour image base64

app.use(cors({
  origin: [
    "http://localhost:5500",      // Live Server VS Code
    "http://127.0.0.1:5500",     // Live Server alternative
    "http://localhost:3000",      // Si tu testes depuis le backend lui-même
    "https://projet-pro-eta.vercel.app/"        // Ton domaine en production (à remplacer)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/auth', authRoute);

app.use('/api/hotels', hotelRoute);

app.use("/api/upload", uploadRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`serveur démarré sur http://localhost:${PORT}`);
});