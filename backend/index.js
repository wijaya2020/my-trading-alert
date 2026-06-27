const express = require('express');
const cors = require('cors');
const path = require('path');

// Mengarahkan dotenv secara presisi ke file .env yang berada di root folder (di luar folder backend)
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// Mengarahkan dotenv secara presisi ke file .env yang berada di dalam folder backend
require('dotenv').config();
// memastikan .env berhasil di panggil
// console.log(`Your URL is ${process.env.URL}`)

const app = express();
app.use(express.json()); // Parsing JSON dari TradingView
//app.use(cors()); // Mengizinkan React Vite mengakses API ini
// 🔥 PERBAIKAN DI SINI: Konfigurasi CORS yang lebih spesifik untuk ngrok & custom header
app.use(cors({
    origin: '*', // Mengizinkan akses dari origin mana pun (termasuk localhost:5175)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'] // Izinkan header ngrok
}));

let alertsData = []; // Database sementara di RAM

// Endpoint Webhook (Menerima data dari TradingView)
app.post('/webhook', (req, res) => {
    const alert = req.body;
    console.log('Sinyal Masuk dari TradingView:', alert);

    // Tambahkan timestamp server lokal
    alert.receivedAt = new Date().toLocaleString();
    alertsData.unshift(alert); // Masukkan ke data teratas

    res.status(200).send('Webhook Received');
});

// Endpoint API untuk Frontend React
app.get('/api/alerts', (req, res) => {
    res.json(alertsData);
});

app.listen(3000, () => {
    console.log(`Backend Node.js berjalan di ${process.env.URL}`);
});