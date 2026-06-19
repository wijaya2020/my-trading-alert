const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // Parsing JSON dari TradingView
app.use(cors()); // Mengizinkan React Vite mengakses API ini

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
    console.log('Backend Node.js berjalan di http://localhost:3000');
});