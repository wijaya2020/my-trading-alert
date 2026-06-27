import React, { useEffect, useRef, memo } from 'react';

function TopStoriesWidget({ symbol = "NASDAQ:AAPL", colorTheme = "light"  }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "symbol",
      symbol: symbol,
      colorTheme: colorTheme,
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height: "100%",
      locale: "en"
    });
    container.current.appendChild(script);
  }, [symbol, colorTheme]);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(TopStoriesWidget);