import React, { useEffect, useRef, memo } from 'react';

function ScreenerWidget({ type = 'us', colorTheme = "light"  }) {
  const container = useRef();

  const marketConfigs = {
    us: {
      market: "america",
      defaultScreen: "most_capitalized",
      link: "https://www.tradingview.com/screener/",
      text: "Stock Screener"
    },
    id: {
      market: "indonesia",
      defaultScreen: "most_capitalized",
      link: "https://www.tradingview.com/screener/",
      text: "Stock Screener"
    },
    crypto: {
      market: "crypto",
      defaultScreen: "general",
      link: "https://www.tradingview.com/crypto-coins-screener/",
      text: "Crypto Screener"
    },
    forex: {
      market: "forex",
      defaultScreen: "general",
      link: "https://www.tradingview.com/markets/currencies/",
      text: "Forex Screener"
    }
  };

  const currentConfig = marketConfigs[type] || marketConfigs['us'];

  useEffect(() => {
    // Kosongkan container dari render sebelumnya
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    
    script.innerHTML = JSON.stringify({
      market: currentConfig.market,
      showToolbar: true,
      defaultColumn: "overview",
      defaultScreen: currentConfig.defaultScreen,
      isTransparent: false,
      locale: "en",
      colorTheme: "${colorTheme}",
      width: "100%",
      height: 550
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    // 💡 CLEANUP: Hapus child script saat komponen dicopot agar tidak berat/dobel
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [type, colorTheme]); 

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={container}></div>
      <div className="tradingview-widget-copyright">
        <a href={currentConfig.link} rel="noopener noreferrer nofollow" target="_blank">
          <span className="blue-text">{currentConfig.text}</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(ScreenerWidget);