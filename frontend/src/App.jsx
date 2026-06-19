import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [alerts, setAlerts] = useState([])

  // Fungsi untuk mengambil data dari Backend Node.js/Python
  const fetchAlerts = async () => {
    try {
      const response = await fetch('https://pentahydrated-jenniffer-unstupid.ngrok-free.dev/api/alerts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 💡 WAJIB Ditambahkan: Melewati halaman peringatan/intersepsi browser milik ngrok
          'ngrok-skip-browser-warning': 'true'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setAlerts(data)
    } catch (error) {
      console.error("Gagal mengambil data:", error)
    }
  }

  // Lakukan polling (refresh data setiap 3 detik)
  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Sinyal Trading</h1>
      <p>Menunggu sinyal JSON dari TradingView Webhook...</p>

      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>Simbol</th>
            <th>Aksi</th>
            <th>Harga Penutupan</th>
            <th>Waktu Sinyal</th>
          </tr>
        </thead>
        <tbody>
          {alerts.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Belum ada data</td></tr>
          ) : (
            alerts.map((alert, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 'bold', color: 'blue' }}>{alert.symbol}</td>
                <td style={{ color: alert.action === 'BUY' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {alert.action}
                </td>
                <td>{alert.price}</td>
                <td>{alert.receivedAt || 'Baru Saja'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App