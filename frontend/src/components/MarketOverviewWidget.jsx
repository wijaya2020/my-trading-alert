
import React, { useEffect, useRef, memo } from 'react';

function MarketOverviewWidget({colorTheme = "light"}) {
  const container = useRef();

  useEffect(
    () => {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "${colorTheme}",
          "dateRange": "1D",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": false,
          "showFloatingTooltip": false,
          "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
          "plotLineColorFalling": "rgba(41, 98, 255, 1)",
          "gridLineColor": "rgba(240, 243, 250, 0)",
          "scaleFontColor": "#0F0F0F",
          "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
          "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
          "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
          "tabs": [
            {
              "title": "Indices",
              "symbols": [
                {
                  "s": "FOREXCOM:SPXUSD",
                  "d": "S&P 500 Index"
                },
                {
                  "s": "IDX:COMPOSITE",
                  "d": "IDX Composite Index",
                  "logo": {
                    "style": "single",
                    "logoid": "indices/jakarta-composite-index"
                  }
                },
                {
                  "s": "TVC:VIX",
                  "d": "Volatility S&P 500"
                },
                {
                  "s": "TVC:DXY",
                  "d": "U.S. Dollar Index"
                },
                {
                  "s": "FOREXCOM:DJI",
                  "d": "Dow Jones Industrial Average Index"
                },
                {
                  "s": "INDEX:NKY",
                  "d": "Japan 225"
                },
                {
                  "s": "INDEX:DEU40",
                  "d": "DAX Index"
                },
                {
                  "s": "FOREXCOM:UKXGBP",
                  "d": "FTSE 100 Index"
                }

              ],
              "originalTitle": "Indices"
            },
            {
              "title": "Futures",
              "symbols": [
                {
                  "s": "CMCMARKETS:GOLD",
                  "d": "Gold"
                },
                {
                  "s": "PYTH:WTI3!",
                  "d": "WTI Crude Oil"
                },
                {
                  "s": "NYMEX:CL1!",
                  "d": "Crude Oil Futures"
                },
                {
                  "s": "MYX:FCPO1!",
                  "d": "Crude Palm Oil Futures"
                },
                {
                  "s": "ICEEUR:NCF1!",
                  "d": "Coal Futures"
                },
                {
                  "s": "MCX:NICKEL1!",
                  "d": "Nickel Futures"
                },

                {
                  "s": "SHFE:SN1!",
                  "d": "Tin Futures"
                }
              ],
              "originalTitle": "Futures"
            },
            {
              "title": "Bonds",
              "symbols": [
                {
                  "s": "TVC:US10Y",
                  "d": "US Government Bonds 10 Year Yield"
                },
                {
                  "s": "TVC:JP10Y",
                  "d": "Japan Government Bonds 10 Year Yield"
                },
                {
                  "s": "TVC:CN10Y",
                  "d": "China Government Bonds 10 Year Yield"
                },
                {
                  "s": "TVC:ID10Y",
                  "d": "Indonesia Government Bonds 10 Year Yield"
                }
              ],
              "originalTitle": "Bonds"
            },
            {
              "title": "Forex",
              "symbols": [

                {
                  "s": "FX_IDC:USDIDR",
                  "d": "USD to IDR"
                },
                {
                  "s": "FX:USDJPY",
                  "d": "USD to JPY"
                },
                {
                  "s": "FX_IDC:USDSGD",
                  "d": "USD to SGD"
                },
                {
                  "s": "FX_IDC:USDMYR",
                  "d": "USD to MYR"
                }
              ],
              "originalTitle": "Forex"
            },
            {
              "title": "Cryptocurrencies",
              "symbols": [
                {
                  "s": "CRYPTOCAP:TOTAL",
                  "d": "Crypto Total Market Cap",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto-total-market-cap"
                  }
                },
                {
                  "s": "CRYPTOCAP:TOTAL2",
                  "d": "Crypto Total Market Cap excluding BTC",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto-total-market-cap"
                  }
                },
                {
                  "s": "CRYPTOCAP:TOTAL3",
                  "d": "Crypto Total Market Cap excluding BTC and ETH",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto-total-market-cap"
                  }
                },
                {
                  "s": "CRYPTOCAP:BTC.D",
                  "d": "Market Cap BTC Dominance",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto/XTVCBTC"
                  }
                },
                {
                  "s": "CRYPTOCAP:USDT.D",
                  "d": "Market Cap USDT Dominance",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto/XTVCUSDT"
                  }
                },
                {
                  "s": "CRYPTOCAP:USDC.D",
                  "d": "Market Cap USDC Dominance",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto/XTVCUSDC"
                  }
                },
                {
                  "s": "BINANCE:BTCUSDT",
                  "d": "BTC to USDT",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto/XTVCBTC"
                  }
                },
                {
                  "s": "BINANCE:ETHUSDT",
                  "d": "ETH to USDT",
                  "logo": {
                    "style": "single",
                    "logoid": "crypto/XTVCETH"
                  }
                }
              ]
            }
          ],
          "support_host": "https://www.tradingview.com",
          "width": "400",
          "height": "550",
          "showSymbolLogo": true,
          "showChart": true
        }`;
      container.current.appendChild(script);
    },
    [colorTheme]
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/" rel="noopener nofollow" target="_blank"><span className="blue-text">Market summary</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(MarketOverviewWidget);
