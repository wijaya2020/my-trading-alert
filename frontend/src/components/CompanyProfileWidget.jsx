import React, { useEffect, useRef, memo } from 'react';

function CompanyProfileWidget({ symbol = "NASDAQ:AAPL",colorTheme = "light" }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      colorTheme: colorTheme,
      isTransparent: true,
      symbol: symbol,
      locale: "en"
    });
    container.current.appendChild(script);
  }, [symbol,colorTheme]);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(CompanyProfileWidget);