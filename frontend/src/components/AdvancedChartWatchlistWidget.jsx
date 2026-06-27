import React, { useEffect, useRef, memo } from 'react';

function AdvancedChartWatchlistWidget({ symbol = "IDX:BBCA", colorTheme = "light" }) {
  const container = useRef();

  useEffect(() => {
    // 💡 PERBAIKAN 1: Bersihkan kontainer setiap kali render ulang agar grafik tidak bertumpuk
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // 💡 PERBAIKAN 2: Menggunakan JSON.stringify agar format valid & properti duplikat dihapus
    script.innerHTML = JSON.stringify({
      autosize: true,
      width: "100%",
      height: "100%",
      interval: "D",
      locale: "en",
      timezone: "exchange",
      theme: colorTheme, // Memanggil variabel secara langsung
      style: "1",
      symbol: symbol, // Memanggil variabel secara langsung
      withdateranges: true,
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      save_image: true,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      support_host: "https://www.tradingview.com",
      studies: [
        "ROC@tv-basicstudies",
        "StochasticRSI@tv-basicstudies",
        "MASimple@tv-basicstudies"
      ],
      compareSymbols: [],
      watchlist: [
        "NASDAQ:SPCX",
        "IDX:COMPOSITE",
        "IDX:BBCA",
        "IDX:BBRI",
        "IDX:BBNI",
        "IDX:BMRI",
        "IDX:ANTM"      
      ]
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbol, colorTheme]); // Dependensi useEffect memastikan widget merespons perubahan

  return (
    // 💡 Batas tinggi (height) spesifik agar tidak hilang/kosong
    <div style={{ height: "500px", width: "100%" }}>
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      </div>
    </div>
  );
}

export default memo(AdvancedChartWatchlistWidget);