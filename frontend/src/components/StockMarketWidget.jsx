import React, { useEffect, useRef, memo } from 'react';

// 💡 Anda bisa menambahkan props seperti 'exchange' agar widget ini bisa berubah 
// secara dinamis saat Anda pindah dari menu Stock (ID) ke Stock (US)
function StockMarketWidget({ exchange = "IDX", colorTheme = "dark" }) {
  const container = useRef();

  useEffect(() => {
    // Bersihkan kontainer agar tidak render ganda (Konflik React 18)
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "exchange": "${exchange}",
        "colorTheme": "${colorTheme}",
        "dateRange": "1D",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0.5)",
        "scaleFontColor": "#d1d4dc",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "width": "100%",
        "height": "550"
      }`;
    container.current.appendChild(script);
  }, [exchange, colorTheme]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: '100%' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(StockMarketWidget);