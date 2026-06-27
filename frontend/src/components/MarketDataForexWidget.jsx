import React, { useEffect, useRef, memo } from 'react';

function MarketDataForexWidget({ colorTheme = "dark" }) {
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
            "name": "USD",
            "symbols": [
              {
                "name": "FX_IDC:EURUSD",
                "displayName": "EUR to USD"
              },
              {
                "name": "FX_IDC:GBPUSD",
                "displayName": "GBP to USD"
              },
              {
                "name": "FX_IDC:USDJPY",
                "displayName": "USD to JPY"
              },
              {
                "name": "FX_IDC:USDSGD",
                "displayName": "USD to SGD"
              }
            ]
          },
          {
            "name": "IDR",
            "symbols": [
              {
                "name": "FX_IDC:USDIDR",
                "displayName": "USD to IDR"
              },              {
                "name": "FX_IDC:SGDIDR",
                "displayName": "SGD to IDR"
              },
              {
                "name": "FX_IDC:MYRIDR",
                "displayName": "MYR to IDR"
              },
              {
                "name": "FX_IDC:CNYIDR",
                "displayName": "CNY to IDR"
              },
              {
                "name": "FX_IDC:HKDIDR",
                "displayName": "HKD to IDR"
              },
              {
                "name": "FX_IDC:TWDIDR",
                "displayName": "TWD to IDR"
              },
              {
                "name": "FX_IDC:JPYIDR",
                "displayName": "JPY to IDR"
              }
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

export default memo(MarketDataForexWidget);