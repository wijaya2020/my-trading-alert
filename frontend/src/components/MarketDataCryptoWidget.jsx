
import React, { useEffect, useRef, memo } from 'react';
 
function MarketDataCryptoWidget({ colorTheme = "dark" }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    // (Script JSON di bawah ini dibiarkan sesuai contoh Anda, hanya width-nya dibuat 100% dan isTransparent: true agar menyatu dengan background web Anda)
    script.innerHTML = `
      {
        "colorTheme": "${colorTheme}",
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "width": "100%",
        "height": 550,
        "symbolsGroups": [
          {
            "name": "Dominance",
            "symbols": [
              {"name": "CRYPTOCAP:TOTAL"},
              {"name": "CRYPTOCAP:TOTAL2"},
              {"name": "CRYPTOCAP:TOTAL3"},
              {"name": "CRYPTOCAP:BTC.D"},
              {"name": "CRYPTOCAP:USDC.D"},
              {"name": "CRYPTOCAP:USDT.D"}
            ]
          },
          {
            "name": "Watchlist",
            "symbols": [
              {"name": "BINANCE:BTCUSDT"},
              {"name": "BINANCE:ETHUSDT"},
              {"name": "BINANCE:BNBUSDT"},
              {"name": "BINANCE:XRPUSDT"},
              {"name": "BINANCE:SOLUSDT"},
              {"name": "BINANCE:ADAUSDT"},
              {"name": "BINANCE:XLMUSDT"},
              {"name": "BINANCE:NEARUSDT"},
              {"name": "BINANCE:LINKUSDT"},
              {"name": "BINANCE:CAKEUSDT"},
              {"name": "BINANCE:BANDUSDT"}
            ]
          }
        ]
      }`;
    container.current.appendChild(script);
  }, [colorTheme]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: '100%' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}


export default memo(MarketDataCryptoWidget);
