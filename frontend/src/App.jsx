import { useState, useEffect } from 'react';

// 💡 Mengimpor widget 
import MarketOverviewWidget from './components/MarketOverviewWidget';
import MarketOverviewCryptoWidget from './components/MarketOverviewCryptoWidget';
import MarketOverviewFuturesWidget from './components/MarketOverviewFuturesWidget';
import MarketOverviewForexWidget from './components/MarketOverviewForexWidget';
import MarketDataIdWidget from './components/MarketDataIdWidget';
import MarketDataUsWidget from './components/MarketDataUsWidget';
import MarketDataCryptoWidget from './components/MarketDataCryptoWidget';
import MarketDataCryptoRankWidget from './components/MarketDataCryptoRankWidget';
import MarketDataFuturesWidget from './components/MarketDataFuturesWidget';
import MarketDataForexWidget from './components/MarketDataForexWidget';
import MarketSummaryWidget from './components/MarketSummaryWidget';
import StockMarketWidget from './components/StockMarketWidget';
import AdvancedChartWidget from './components/AdvancedChartWidget';
import AdvancedChartWatchlistWidget from './components/AdvancedChartWatchlistWidget';
import ScreenerWidget from './components/ScreenerWidget';
import TickerTapeWidget from './components/TickerTapeWidget';
import SymbolInfoWidget from './components/SymbolInfoWidget';
import CompanyProfileWidget from './components/CompanyProfileWidget';
import FundamentalDataWidget from './components/FundamentalDataWidget';
import TechnicalAnalysisWidget from './components/TechnicalAnalysisWidget';
import TopStoriesWidget from './components/TopStoriesWidget';
import HeatmapCryptoCoinsWidget from './components/HeatmapCryptoCoinsWidget';
import HeatmapStockWidget from './components/HeatmapStockWidget';
import EconomicCalendarWidget from './components/EconomicCalendarWidget';
import ForexTableWidget from './components/ForexTableWidget';
import './App.css';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [activeMenu, setActiveMenu] = useState('market-overview');
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:AAPL');

  // 💡 1. Tambahkan State untuk Tema
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 💡 2. Buat Variabel Warna Dinamis
  const theme = {
    bg: isDarkMode ? '#131722' : '#f0f3fa',
    text: isDarkMode ? '#fff' : '#131722',
    sidebar: isDarkMode ? '#1c2030' : '#ffffff',
    border: isDarkMode ? '#2a2e39' : '#e0e3eb',
    card: isDarkMode ? '#1e222d' : '#ffffff',
    textMuted: isDarkMode ? '#b2b5be' : '#787b86'
  };


  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/alerts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 3000)
    return () => clearInterval(interval)
  }, [])

  // 💡 EFEK BARU: Ganti symbol secara otomatis saat menu di-klik
  useEffect(() => {
    if (activeMenu === 'stock-us-analysis') {
      setSelectedSymbol('NASDAQ:AAPL');
    } else if (activeMenu === 'stock-id-analysis') {
      setSelectedSymbol('IDX:BBCA');
    } else if (activeMenu === 'crypto-analysis') {
      setSelectedSymbol('BINANCE:BTCUSDT');
    } else if (activeMenu === 'forex-analysis') {
      setSelectedSymbol('FX:USDJPY');
    }
  }, [activeMenu]); // Dijalankan tiap kali activeMenu berubah

  const SidebarButton = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveMenu(id)}
      style={{
        display: 'block', width: '100%', padding: '12px', marginBottom: '8px', textAlign: 'left',
        backgroundColor: activeMenu === id ? '#2196F3' : 'transparent',
        color: activeMenu === id ? '#fff' : theme.text, // 💡 Teks menyesuaikan tema
        border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold',
        transition: 'background 0.2s'
      }}
    >
      {icon} {label}
    </button>
  );

  return (
    // 💡 3. Terapkan variabel warna ke kontainer utama
    <div style={{ display: 'flex', fontFamily: 'sans-serif', minHeight: '100vh', width: '100%', backgroundColor: theme.bg, color: theme.text }}>
      {/* 1. SIDEBAR MENU */}
      <div style={{ width: '220px', backgroundColor: theme.sidebar, padding: '20px', borderRight: `1px solid ${theme.border}` }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#2196F3' }}>My Trading Alert</h2>

        {/* 💡 Tombol Toggle Tema */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px',
            backgroundColor: isDarkMode ? '#2a2e39' : '#e0e3eb',
            color: theme.text, border: 'none', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </button>

        {/* MENU WATCHLISTS */}
        <p style={{ fontSize: '12px', color: '#b2b5be', marginTop: '30px', marginBottom: '10px' }}>MARKET OVERVIEW</p>
        <SidebarButton id="market-overview" icon="🌐" label="Global Market " />
        <SidebarButton id="stock-us" icon="🇺🇸" label="Stock (US)" />
        <SidebarButton id="stock-id" icon="🇮🇩" label="Stock (ID)" />
        <SidebarButton id="crypto" icon="₿" label="Cryptocurrencies" />
        <SidebarButton id="futures" icon="📜" label="Futures" />
        <SidebarButton id="forex" icon="💱" label="Forex" />

        {/* MENU SCREENERS */}
        <p style={{ fontSize: '12px', color: '#b2b5be', marginTop: '30px', marginBottom: '10px' }}>SCREENERS</p>
        <SidebarButton id="screener-stock-us" icon="🇺🇸" label="Stock (US)" />
        <SidebarButton id="screener-stock-id" icon="🇮🇩" label="Stock (ID)" />
        <SidebarButton id="screener-crypto" icon="₿" label="Cryptocurrency" />
        <SidebarButton id="screener-forex" icon="💱" label="Forex" />

        {/* MENU ANALYSIS */}
        <p style={{ fontSize: '12px', color: '#b2b5be', marginTop: '30px', marginBottom: '10px' }}>ANALYSIS</p>
        <SidebarButton id="stock-us-analysis" icon="🇺🇸" label="Stock (US)" />
        <SidebarButton id="stock-id-analysis" icon="🇮🇩" label="Stock (ID)" />
        <SidebarButton id="crypto-analysis" icon="₿" label="Cryptocurrency" />
        <SidebarButton id="forex-analysis" icon="💱" label="Forex" />

        {/* MENU CHARTS */}
        <p style={{ fontSize: '12px', color: '#b2b5be', marginTop: '20px', marginBottom: '10px' }}>CHARTS</p>
        <SidebarButton id="chart" icon="📊" label="Advanced Chart" />

        {/* MENU ALERTS */}
        <p style={{ fontSize: '12px', color: '#b2b5be', marginTop: '20px', marginBottom: '10px' }}>ALERTS</p>
        <SidebarButton id="alert" icon="🔔" label="Signals (JSON)" />
      </div>

      {/* 2. KONTEN UTAMA */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>

        {/* 💡 Menambahkan id screener ke dalam array includes() */}
        {['market-overview', 'stock-id', 'stock-us', 'crypto', 'futures', 'forex', 'chart', 'screener-stock-us', 'screener-stock-id', 'screener-crypto', 'screener-forex', 'stock-us-analysis', 'stock-id-analysis', 'crypto-analysis', 'forex-analysis'].includes(activeMenu) && (
          <div>
            {/* 💡 Menggunakan replaceAll agar spasi teraplikasi ke semua tanda minus */}
            <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px', textTransform: 'capitalize' }}>
              Dashboard {activeMenu.replaceAll('-', ' ')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

              {/* === MARKET OVERVIEW === */}
              {activeMenu === 'market-overview' && (
                <div style={{ width: '100%', height: '800px' }}>
                  <MarketOverviewWidget colorTheme={isDarkMode ? "dark" : "light"} />
                </div>
              )}

              {/* === STOCK (ID) === */}
              {activeMenu === 'stock-id' && (
                <>
                  <div >
                    <h3>IDX Market Summary</h3>
                    <MarketSummaryWidget type="IDX" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Top IDX Gainers/Volume</h3>
                    <StockMarketWidget exchange="IDX" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>IDX Stock Market</h3>
                    <MarketDataIdWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === STOCK (US) === */}
              {activeMenu === 'stock-us' && (
                <>
                  <div >
                    <h3>US Stock Market Summary</h3>
                    <MarketSummaryWidget type="US" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Top US Gainers/Volume</h3>
                    <StockMarketWidget exchange="US" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>US Stock Market</h3>
                    <MarketDataUsWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === CRYPTOCURRENCY === */}
              {activeMenu === 'crypto' && (
                <>
                  <div >
                    <h3>Crypto Market Summary</h3>
                    <MarketSummaryWidget type="CRYPTO" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Cryptocurrency Market Cap</h3>
                    <MarketDataCryptoRankWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Cryptocurrency Data Market</h3>
                    <MarketDataCryptoWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === FUTURES === */}
              {activeMenu === 'futures' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Futures Market</h3>
                    <MarketDataFuturesWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === FOREX === */}
              {activeMenu === 'forex' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Forex Market</h3>
                    <MarketDataForexWidget colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === CHARTS === */}
              {activeMenu === 'chart' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>Advanced Chart</h3>
                    <AdvancedChartWatchlistWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === SCREENERS === */}

              {/* 1. Stock US */}
              {activeMenu === 'screener-stock-us' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>SCREENER STOCK US</h3>
                    <ScreenerWidget type="us" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* 2. Stock ID */}
              {activeMenu === 'screener-stock-id' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>SCREENER STOCK ID</h3>
                    <ScreenerWidget type="id" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* 3. Crypto */}
              {activeMenu === 'screener-crypto' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>SCREENER CRYPTO</h3>
                    <ScreenerWidget type="crypto" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* 4. Forex */}
              {activeMenu === 'screener-forex' && (
                <>
                  <div style={{ width: '100%', backgroundColor: theme.bg, padding: '15px', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>SCREENER FOREX</h3>
                    <ScreenerWidget type="forex" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>
                </>
              )}

              {/* === ANALYSIS: STOCK US === */}
              {activeMenu === 'stock-us-analysis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Box Search */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    backgroundColor: theme.card,
                    padding: '15px',
                    borderRadius: '8px'
                  }}>
                    {/* Label Text */}
                    <span style={{ fontWeight: 'bold', color: theme.text }}>
                      Cari Saham US:
                    </span>

                    {/* Input Search */}
                    <input
                      type="text"
                      id="symbol-search-us"
                      placeholder="Contoh: NASDAQ:TSLA"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelectedSymbol(e.target.value.toUpperCase());
                      }}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        width: '250px',
                        outline: 'none',
                        // 💡 DI SINI PERBAIKANNYA: Menggunakan objek theme yang tepat
                        backgroundColor: theme.bg,       // Input meminjam warna background utama
                        color: theme.text,               // Teks input hitam di light, putih di dark
                        border: `1px solid ${theme.border}` // Border abu-abu terang/gelap sesuai tema
                      }}
                    />

                    {/* Button Analisa */}
                    <button
                      onClick={() => setSelectedSymbol(document.getElementById('symbol-search-us').value.toUpperCase())}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2962ff', // Warna biru primer yang aman di kedua mode
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}>
                      Analisa
                    </button>

                    {/* Keterangan Text Muted */}
                    <span style={{
                      fontSize: '12px',
                      marginLeft: '10px',
                      color: theme.textMuted // 💡 Sempurna menggunakan warna abu-abu yang sudah Anda definisikan
                    }}>
                      *Menampilkan: {selectedSymbol}
                    </span>
                  </div>

                  <div style={{ width: '100%', marginBottom: '10px' }}>
                    <TickerTapeWidget type="us" colorTheme={isDarkMode ? "dark" : "light"} /> {/* 💡 Tambahkan type="us" */}
                  </div>

                  {/* --- 2. GRID WIDGETS DENGAN PROP DINAMIS --- */}
                  {/* Perhatikan bahwa kita mengganti "NASDAQ:AAPL" dengan state selectedSymbol */}
                  <div className="analysis-grid">

                    <div className="span-full">
                      <SymbolInfoWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <AdvancedChartWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '390px' }}>
                      <CompanyProfileWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '490px' }}>
                      <FundamentalDataWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TechnicalAnalysisWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TopStoriesWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Stock US Heatmap
                      </h2>
                      <HeatmapStockWidget dataSource="SPX500" colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                  </div>
                </div>
              )}

              {/* === ANALYSIS: STOCK ID === */}
              {activeMenu === 'stock-id-analysis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Box Search */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    backgroundColor: theme.card,
                    padding: '15px',
                    borderRadius: '8px'
                  }}>
                    {/* Label Text */}
                    <span style={{ fontWeight: 'bold', color: theme.text }}>
                      Cari Saham ID:
                    </span>

                    {/* Input Search */}
                    <input
                      type="text"
                      id="symbol-search-us"
                      placeholder="Contoh: IDX:BBCA"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelectedSymbol(e.target.value.toUpperCase());
                      }}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        width: '250px',
                        outline: 'none',
                        // 💡 DI SINI PERBAIKANNYA: Menggunakan objek theme yang tepat
                        backgroundColor: theme.bg,       // Input meminjam warna background utama
                        color: theme.text,               // Teks input hitam di light, putih di dark
                        border: `1px solid ${theme.border}` // Border abu-abu terang/gelap sesuai tema
                      }}
                    />

                    {/* Button Analisa */}
                    <button
                      onClick={() => setSelectedSymbol(document.getElementById('symbol-search-us').value.toUpperCase())}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2962ff', // Warna biru primer yang aman di kedua mode
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}>
                      Analisa
                    </button>

                    {/* Keterangan Text Muted */}
                    <span style={{
                      fontSize: '12px',
                      marginLeft: '10px',
                      color: theme.textMuted // 💡 Sempurna menggunakan warna abu-abu yang sudah Anda definisikan
                    }}>
                      *Menampilkan: {selectedSymbol}
                    </span>
                  </div>

                  <div style={{ width: '100%', marginBottom: '10px' }}>
                    <TickerTapeWidget type="id" colorTheme={isDarkMode ? "dark" : "light"} /> {/* 💡 Tambahkan type="id" */}
                  </div>

                  {/* --- 2. GRID WIDGETS DENGAN PROP DINAMIS --- */}
                  {/* Perhatikan bahwa kita mengganti "NASDAQ:AAPL" dengan state selectedSymbol */}
                  <div className="analysis-grid">

                    <div className="span-full">
                      <SymbolInfoWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <AdvancedChartWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '390px' }}>
                      <CompanyProfileWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '490px' }}>
                      <FundamentalDataWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TechnicalAnalysisWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TopStoriesWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Stock ID Heatmap
                      </h2>
                      <HeatmapStockWidget dataSource="IDX30" colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                  </div>
                </div>
              )}

              {/* === ANALYSIS: CRYPTO === */}
              {activeMenu === 'crypto-analysis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Box Search */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    backgroundColor: theme.card,
                    padding: '15px',
                    borderRadius: '8px'
                  }}>
                    {/* Label Text */}
                    <span style={{ fontWeight: 'bold', color: theme.text }}>
                      Cari Saham US:
                    </span>

                    {/* Input Search */}
                    <input
                      type="text"
                      id="symbol-search-us"
                      placeholder="Contoh: BINANCE:BTCUSDT"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelectedSymbol(e.target.value.toUpperCase());
                      }}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        width: '250px',
                        outline: 'none',
                        // 💡 DI SINI PERBAIKANNYA: Menggunakan objek theme yang tepat
                        backgroundColor: theme.bg,       // Input meminjam warna background utama
                        color: theme.text,               // Teks input hitam di light, putih di dark
                        border: `1px solid ${theme.border}` // Border abu-abu terang/gelap sesuai tema
                      }}
                    />

                    {/* Button Analisa */}
                    <button
                      onClick={() => setSelectedSymbol(document.getElementById('symbol-search-us').value.toUpperCase())}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2962ff', // Warna biru primer yang aman di kedua mode
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}>
                      Analisa
                    </button>

                    {/* Keterangan Text Muted */}
                    <span style={{
                      fontSize: '12px',
                      marginLeft: '10px',
                      color: theme.textMuted // 💡 Sempurna menggunakan warna abu-abu yang sudah Anda definisikan
                    }}>
                      *Menampilkan: {selectedSymbol}
                    </span>
                  </div>

                  {/* Ticker Tape (Tetap dipertahankan sebagai pemanis/informasi harga) */}
                  <div style={{ width: '100%', marginBottom: '10px' }}>
                    <TickerTapeWidget type="crypto" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>

                  {/* --- 2. GRID WIDGETS DENGAN PROP DINAMIS --- */}
                  {/* Perhatikan bahwa kita mengganti "NASDAQ:AAPL" dengan state selectedSymbol */}
                  <div className="analysis-grid">

                    <div className="span-full">
                      <SymbolInfoWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <AdvancedChartWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '390px' }}>
                      <CompanyProfileWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TechnicalAnalysisWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TopStoriesWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Crypto Coins Heatmap
                      </h2>
                      <HeatmapCryptoCoinsWidget colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <br></br>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Crypto Market Data
                      </h2>
                      <MarketDataCryptoRankWidget colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                  </div>
                </div>
              )}

              {/* === ANALYSIS: FOREX === */}
              {activeMenu === 'forex-analysis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Box Search */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    backgroundColor: theme.card,
                    padding: '15px',
                    borderRadius: '8px'
                  }}>
                    {/* Label Text */}
                    <span style={{ fontWeight: 'bold', color: theme.text }}>
                      Cari Forex:
                    </span>

                    {/* Input Search */}
                    <input
                      type="text"
                      id="symbol-search-us"
                      placeholder="Contoh: FX:USDJPY"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelectedSymbol(e.target.value.toUpperCase());
                      }}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        width: '250px',
                        outline: 'none',
                        // 💡 DI SINI PERBAIKANNYA: Menggunakan objek theme yang tepat
                        backgroundColor: theme.bg,       // Input meminjam warna background utama
                        color: theme.text,               // Teks input hitam di light, putih di dark
                        border: `1px solid ${theme.border}` // Border abu-abu terang/gelap sesuai tema
                      }}
                    />

                    {/* Button Analisa */}
                    <button
                      onClick={() => setSelectedSymbol(document.getElementById('symbol-search-us').value.toUpperCase())}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2962ff', // Warna biru primer yang aman di kedua mode
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}>
                      Analisa
                    </button>

                    {/* Keterangan Text Muted */}
                    <span style={{
                      fontSize: '12px',
                      marginLeft: '10px',
                      color: theme.textMuted // 💡 Sempurna menggunakan warna abu-abu yang sudah Anda definisikan
                    }}>
                      *Menampilkan: {selectedSymbol}
                    </span>
                  </div>
                  {/* Ticker Tape (Tetap dipertahankan sebagai pemanis/informasi harga) */}
                  <div style={{ width: '100%', marginBottom: '10px' }}>
                    <TickerTapeWidget type="forex" colorTheme={isDarkMode ? "dark" : "light"} />
                  </div>

                  {/* --- 2. GRID WIDGETS DENGAN PROP DINAMIS --- */}
                  {/* Perhatikan bahwa kita mengganti "NASDAQ:AAPL" dengan state selectedSymbol */}
                  <div className="analysis-grid">

                    <div className="span-full">
                      <SymbolInfoWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <AdvancedChartWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '390px' }}>
                      <CompanyProfileWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TechnicalAnalysisWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-half" style={{ height: '425px' }}>
                      <TopStoriesWidget symbol={selectedSymbol} colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Economic Calendar
                      </h2>
                      <EconomicCalendarWidget colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                    <br></br>

                    <div className="span-full" style={{ height: '500px' }}>
                      <h2 style={{ fontSize: '30px', color: '#b2b5be', marginBottom: '20px' }}>
                        Cross Rate
                      </h2>
                      <ForexTableWidget colorTheme={isDarkMode ? "dark" : "light"} />
                    </div>

                  </div>
                </div>
              )}


            </div>
          </div>
        )}

        {activeMenu === 'alert' && (<div>{/* Tabel Sinyal Anda... */}</div>)}

      </div>
    </div>
  )
}

export default App;