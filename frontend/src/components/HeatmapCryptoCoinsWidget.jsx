// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

// 💡 Tambahkan prop `symbol` agar emiten bisa diubah dinamis dari App.jsx
function HeatmapCryptoCoinsWidget({ colorTheme = "dark"  }) {

  const container = useRef();

  useEffect(
    () => {
      // 💡 PERBAIKAN 1: Bersihkan kontainer setiap kali render ulang agar grafik tidak bertumpuk/ganda
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "24h_close_change|5",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "${colorTheme}",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
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

export default memo(HeatmapCryptoCoinsWidget);