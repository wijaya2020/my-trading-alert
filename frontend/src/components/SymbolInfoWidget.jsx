import React, { useEffect, useRef, memo } from 'react';

function SymbolInfoWidget({ symbol = "NASDAQ:AAPL", colorTheme = "light" }) {
  const container = useRef();

  useEffect(() => {
    // Bersihkan widget lama saat symbol atau tema berubah
    container.current.innerHTML = '';
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Masukkan konfigurasi
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      locale: "en",
      colorTheme: colorTheme, // 💡 Perbaikan: Langsung panggil variabelnya
      isTransparent: true
    });
    
    container.current.appendChild(script);
    
  }, [symbol, colorTheme]); // 💡 Perbaikan: Tambahkan colorTheme di sini agar merespons perubahan

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(SymbolInfoWidget);