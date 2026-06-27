import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, createSeriesMarkers } from 'lightweight-charts';

export default function TradingChart({ symbol, signals }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const containerWidth = chartContainerRef.current.clientWidth || 600;

    const chart = createChart(chartContainerRef.current, {
      width: containerWidth,
      height: 400,
      layout: {
        background: { color: '#1e222d' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      timeScale: {
        borderColor: '#2a2e39',
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // 💡 LOGIKA DATA DINAMIS BERSANDARKAN EMITEN:
    // Pada skenario asli, Anda disarankan melakukan fetch data candlestick historis dari API backend/securities berdasarkan kode emiten di sini.
    // Sebagai contoh dinamis, kita sediakan generator data candle tiruan yang berbeda nilainya sesuai dengan kode string Emiten:
    let basePrice = 10000; // Contoh harga BBCA
    if (symbol.toUpperCase() === 'BBRI') basePrice = 4500;
    if (symbol.toUpperCase() === 'TLKM') basePrice = 3000;
    
    // Membuat pergerakan data candle tiruan yang dinamis berdasarkan basePrice emiten
    const dynamicCandleData = [
      { time: '2026-06-15', open: basePrice, high: basePrice * 1.02, low: basePrice * 0.99, close: basePrice * 1.01 },
      { time: '2026-06-16', open: basePrice * 1.01, high: basePrice * 1.03, low: basePrice * 1.00, close: basePrice * 1.025 },
      { time: '2026-06-17', open: basePrice * 1.025, high: basePrice * 1.035, low: basePrice * 0.98, close: basePrice * 0.99 },
      { time: '2026-06-18', open: basePrice * 0.99, high: basePrice * 1.015, low: basePrice * 0.985, close: basePrice * 1.01 },
      { time: '2026-06-19', open: basePrice * 1.01, high: basePrice * 1.04, low: basePrice * 1.01, close: basePrice * 1.035 },
    ];
    candlestickSeries.setData(dynamicCandleData);

    // 💡 PROSES MARKER DINAMIS DARI BACKEND WEBHOOK (signals):
    // Melakukan filter data alert JSON yang masuk dari backend, hanya mengambil yang sesuai dengan kode emiten yang sedang aktif dilihat.
    const dynamicMarkers = signals
      .filter(alert => alert.symbol?.toUpperCase() === symbol.toUpperCase())
      .map(alert => {
        // Ambil data tanggal/waktu dari alert, pastikan formatnya YYYY-MM-DD agar dibaca lightweight-charts
        // Jika format dari backend berupa ISO String (ex: 2026-06-19T14:00:00Z), potong 10 digit pertamanya.
        const signalDate = alert.receivedAt ? alert.receivedAt.substring(0, 10) : '2026-06-19';
        
        return {
          time: signalDate,
          position: alert.action === 'BUY' ? 'belowBar' : 'aboveBar',
          color: alert.action === 'BUY' ? '#2196F3' : '#e91e63',
          shape: alert.action === 'BUY' ? 'arrowUp' : 'arrowDown',
          text: alert.action
        };
      });

    // Pasang marker jika ada sinyal yang cocok dari backend
    if (dynamicMarkers.length > 0) {
      createSeriesMarkers(candlestickSeries, dynamicMarkers);
    } else {
      // Jika belum ada data sinyal masuk di emiten ini, tampilkan marker tiruan default agar chart tidak sepi
      const fallbackMarkers = [
        { time: '2026-06-17', position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'MOCK BUY' },
        { time: '2026-06-19', position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'MOCK SELL' },
      ];
      createSeriesMarkers(candlestickSeries, fallbackMarkers);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, signals]); // 💡 PERBAIKAN: useEffect akan mendengarkan perubahan emiten (symbol) atau data baru (signals) untuk menggambar ulang chart secara real-time

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: '#1e222d', padding: '15px', borderRadius: '8px' }}>
      <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Live Chart Saham: <span style={{ color: '#2196F3' }}>{symbol.toUpperCase()}</span></h3>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
}