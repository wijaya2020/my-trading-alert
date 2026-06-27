import React, { useEffect, useRef, memo } from 'react';

function TickerTapeWidget({ type = 'us', colorTheme = "light"  }) {
  const container = useRef();

  // Fungsi untuk mendapatkan daftar list sesuai tipe
  const getSymbols = () => {
    switch (type) {
      case 'id':
        return [
          { proName: "IDX:COMPOSITE", title: "IHSG" },
          { proName: "IDX:BBCA", title: "BCA" },
          { proName: "IDX:BBRI", title: "BRI" },
          { proName: "IDX:BMRI", title: "Mandiri" }, 
          { proName: "IDX:BBNI", title: "BNI" }
        ];
      case 'crypto':
        return [
          { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
          { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
          { proName: "BINANCE:BNBUSDT", title: "BNB" },
          { proName: "BINANCE:XRPUSDT", title: "Ripple" }
        ];
      case 'forex':
        return [
          { proName: "FX:USDJPY", title: "USD/JPY" },
          { proName: "OANDA:USDSGD", title: "USD/SGD" },
          { proName: "OANDA:USDCNY", title: "USD/CNY" },
          { proName: "FXPRO:USDIDR", title: "USD/IDR" }
        ];
      case 'us':
      default:
        return [
          { proName: "NASDAQ:TSLA", title: "Tesla" },
          { proName: "NASDAQ:AAPL", title: "Apple" },
          { proName: "NASDAQ:NVDA", title: "Nvidia" },
          { proName: "NASDAQ:MSFT", title: "Microsoft" },
          { proName: "NASDAQ:AMZN", title: "Amazon" }
        ];
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
    }
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: getSymbols(),
      showSymbolLogo: true,
      colorTheme: colorTheme,
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });
    
    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [type, colorTheme]); // Akan render ulang jika prop 'type' berubah

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(TickerTapeWidget);