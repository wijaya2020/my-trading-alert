import React, { useEffect, useRef, memo } from 'react';

function TechnicalAnalysisWidget({ symbol = "NASDAQ:AAPL", colorTheme = "light"  }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "15m",
      width: "100%",
      isTransparent: true,
      height: "100%",
      symbol: symbol,
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: colorTheme
    });
    container.current.appendChild(script);
  }, [symbol, colorTheme]);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(TechnicalAnalysisWidget);