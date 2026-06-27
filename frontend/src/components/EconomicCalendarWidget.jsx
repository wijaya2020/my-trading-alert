// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

// 💡 Tambahkan prop `symbol` agar emiten bisa diubah dinamis dari App.jsx
function EconomicCalendarWidget({ colorTheme = "dark"  }) {

  const container = useRef();

  useEffect(
    () => {
      // 💡 PERBAIKAN 1: Bersihkan kontainer setiap kali render ulang agar grafik tidak bertumpuk/ganda
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "${colorTheme}",
          "isTransparent": false,
          "locale": "en",
          "countryFilter": "cn,id,jp,us",
          "importanceFilter": "-1,0,1",
          "width": "100%",
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    [colorTheme]
  );

  return (
    // 💡 Tambahkan batas tinggi (height) spesifik agar tidak hilang/kosong
    <div style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(EconomicCalendarWidget);