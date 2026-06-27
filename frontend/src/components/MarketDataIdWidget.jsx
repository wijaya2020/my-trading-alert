import React, { useEffect, useRef, memo } from 'react';

function MarketDataIdWidget({ colorTheme = "dark" }) {
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
              {"name": "IDX:COMPOSITE", "displayName": "IDX Composite Index"}
            ]
          },
          {
            "name": "Watchlist",
            "symbols": [
              {"name": "IDX:AADI", "displayName": "AADI"},
              {"name": "IDX:ACES", "displayName": "ACES"},
              {"name": "IDX:ADRO", "displayName": "ADRO"},
              {"name": "IDX:AKRA", "displayName": "AKRA"},
              {"name": "IDX:AMMN", "displayName": "AMMN"},
              {"name": "IDX:ANTM", "displayName": "ANTM"},
              {"name": "IDX:ASGR", "displayName": "ASGR"},
              {"name": "IDX:ASII", "displayName": "ASII"},
              {"name": "IDX:BBCA", "displayName": "BBCA"},
              {"name": "IDX:BBNI", "displayName": "BBNI"},
              {"name": "IDX:BBRI", "displayName": "BBRI"},
              {"name": "IDX:BBTN", "displayName": "BBTN"},
              {"name": "IDX:BFIN", "displayName": "BFIN"},
              {"name": "IDX:BMRI", "displayName": "BMRI"},
              {"name": "IDX:BRIS", "displayName": "BRIS"},
              {"name": "IDX:CDIA", "displayName": "CDIA"},
              {"name": "IDX:CFIN", "displayName": "CFIN"},
              {"name": "IDX:DMAS", "displayName": "DMAS"},
              {"name": "IDX:ERAA", "displayName": "ERAA"},
              {"name": "IDX:GEMS", "displayName": "GEMS"},
              {"name": "IDX:HEXA", "displayName": "HEXA"},
              {"name": "IDX:ICBP", "displayName": "ICBP"},
              {"name": "IDX:INDF", "displayName": "INDF"},
              {"name": "IDX:ITMG", "displayName": "ITMG"},
              {"name": "IDX:MEDC", "displayName": "MEDC"},
              {"name": "IDX:MPMX", "displayName": "MPMX"},
              {"name": "IDX:PGAS", "displayName": "PGAS"},
              {"name": "IDX:PGEO", "displayName": "PGEO"},
              {"name": "IDX:PTBA", "displayName": "PTBA"},
              {"name": "IDX:SCMA", "displayName": "SCMA"},
              {"name": "IDX:SIDO", "displayName": "SIDO"},
              {"name": "IDX:SMRA", "displayName": "SMRA"},
              {"name": "IDX:TAPG", "displayName": "TAPG"},
              {"name": "IDX:TINS", "displayName": "TINS"},
              {"name": "IDX:TLKM", "displayName": "TLKM"},
              {"name": "IDX:TUGU", "displayName": "TUGU"},
              {"name": "IDX:UNTR", "displayName": "UNTR"},
              {"name": "IDX:UNVR", "displayName": "UNVR"}
            ]
          },
          {
            "name": "Watchlist 2",
            "symbols": [
              {"name": "IDX:BREN", "displayName": "BREN"}, 
              {"name": "IDX:BUMI", "displayName": "BUMI"}, 
              {"name": "IDX:CDIA", "displayName": "CDIA"}, 
              {"name": "IDX:COIN", "displayName": "COIN"}, 
              {"name": "IDX:DSSA", "displayName": "DSSA"}, 
              {"name": "IDX:EMTK", "displayName": "EMTK"}, 
              {"name": "IDX:GIAA", "displayName": "GIAA"}, 
              {"name": "IDX:GOTO", "displayName": "GOTO"}, 
              {"name": "IDX:INET", "displayName": "INET"}, 
              {"name": "IDX:MDKA", "displayName": "MDKA"}, 
              {"name": "IDX:MEDC", "displayName": "MEDC"}, 
              {"name": "IDX:PACK", "displayName": "PACK"}, 
              {"name": "IDX:PANI", "displayName": "PANI"}, 
              {"name": "IDX:PYFA", "displayName": "PYFA"}, 
              {"name": "IDX:SRTG", "displayName": "SRTG"}, 
              {"name": "IDX:SSIA", "displayName": "SSIA"}, 
              {"name": "IDX:TOBA", "displayName": "TOBA"}, 
              {"name": "IDX:WIFI", "displayName": "WIFI"}, 
              {"name": "IDX:", "displayName": ""}
            ]
          },
          {
            "name": "Watchlist 3",
            "symbols": [
              {"name": "IDX:PGEO", "displayName": "PGEO"}, 
              {"name": "IDX:PJHB", "displayName": "PJHB"}
            ]
          },
          {
            "name": "Watchlist 4",
            "symbols": [
              {"name": "IDX:PYFA", "displayName": "PYFA"}, 
              {"name": "IDX:SUPA", "displayName": "SUPA"}
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

export default memo(MarketDataIdWidget);