import React, { useEffect, useRef, memo } from 'react';

function MarketDataUsWidget({ colorTheme = "dark" }) {
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
            "name": "Indices",
            "symbols": [
              { "name": "FOREXCOM:SPXUSD", "displayName": "S&P 500 Index" }
            ]
          },
          {
            "name": "Financial",
            "symbols": [
              {"name": "NYSE:JPM",  "displayName": "JPMorgan Chase"},
              {"name": "NYSE:WFC",  "displayName": "Wells Fargo Co New"},
              {"name": "NYSE:BAC",  "displayName": "Bank Amer Corp"},
              {"name": "NYSE:HSBC", "displayName": "Hsbc Hldgs Plc"},
              {"name": "NYSE:C",    "displayName": "Citigroup Inc"},
              {"name": "NYSE:MA",   "displayName": "Mastercard Incorporated"}
            ]
          },
          {
            "name": "Technology",
            "symbols": [
              {"name": "NASDAQ:AAPL",  "displayName": "Apple"},
              {"name": "NASDAQ:GOOGL", "displayName": "Alphabet"},
              {"name": "NASDAQ:MSFT",  "displayName": "Microsoft"},
              {"name": "NASDAQ:META",  "displayName": "Meta Platforms"},
              {"name": "NYSE:ORCL",    "displayName": "Oracle Corp"},
              {"name": "NASDAQ:INTC",  "displayName": "Intel Corp"}
            ]
          },
        {
          "name": "Services",
          "symbols": [
            {"name": "NASDAQ:AMZN", "displayName": "Amazon"},
            {"name": "NYSE:BABA",   "displayName": "Alibaba Group Hldg Ltd"},
            {"name": "NYSE:T",      "displayName": "At&t Inc"},
            {"name": "NYSE:WMT",    "displayName": "Walmart"},
            {"name": "NYSE:V",      "displayName": "Visa"}
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

export default memo(MarketDataUsWidget);