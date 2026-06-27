import React, { useEffect, useRef, memo } from 'react';

function MarketDataFuturesWidget({ colorTheme = "dark" }) {
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
            "name": "Energy",
            "symbols": [
              {
                "name": "TVC:USOIL",
                "displayName": "WTI Crude Oil"
              },
              {
                "name": "NYMEX:CL1!",
                "displayName": "Crude Oil Futures"
              },
              {
                "name": "MYX:FCPO1!",
                "displayName": "Crude Palm Oil Futures"
              },
              {
                "name": "ICEEUR:NCF1!",
                "displayName": "Coal Futures"
              },
              {
                "name": "BMFBOVESPA:ETH1!",
                "displayName": "Ethanol"
              }
            ]
          },
          {
            "name": "Metals",
            "symbols": [
              {
                "name": "CMCMARKETS:GOLD",
                "displayName": "Gold"
              },
              {
                "name": "CMCMARKETS:SILVER",
                "displayName": "Silver"
              },
              {
                "name": "CMCMARKETS:PLATINUM",
                "displayName": "Platinum"
              },
              {
                "name": "CMCMARKETS:COPPER",
                "displayName": "Copper"
              },
              {
                "name": "MCX:NICKEL1!",
                "displayName": "Nickel Futures"
              },
              {
                "name": "SHFE:SN1!",
                "displayName": "Tin Futures"
              }
            ]
          },
          {
            "name": "Agricultural",
            "symbols": [
              {
                "name": "BMFBOVESPA:ICF1!",
                "displayName": "Coffee"
              },
              {
                "name": "CMCMARKETS:COTTON",
                "displayName": "Cotton"
              },
              {
                "name": "BMFBOVESPA:SJC1!",
                "displayName": "Soybean"
              },
              {
                "name": "BMFBOVESPA:CCM1!",
                "displayName": "Corn"
              }
            ]
          },
          {
            "name": "Currencies",
            "symbols": [
              {
                "name": "BMFBOVESPA:JPY1!",
                "displayName": "Japanese Yen"
              },
              {
                "name": "BMFBOVESPA:CAD1!",
                "displayName": "Canadian Dollar"
              }
            ]
          },
          {
            "name": "Indices",
            "symbols": [
              {
                "name": "BMFBOVESPA:ISP1!",
                "displayName": "S&P 500"
              },
              {
                "name": "CME_MINI:ES1!",
                "displayName": "E-mini S&P 500 future"
              },
              {
                "name": "BMFBOVESPA:INK1!",
                "displayName": "Nikkei 225"
              },
              {
                "name": "EUREX:FDAX1!",
                "displayName": "DAX"
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

export default memo(MarketDataFuturesWidget);