import React, { useEffect, useRef, memo } from 'react';

function ForexTableWidget({colorTheme = "light"}) {
  const container = useRef();

  useEffect(() => {
    // Bersihkan container sebelum render ulang
    if (container.current) {
      container.current.innerHTML = '';
    }

    // Buat elemen script untuk TradingView Forex Cross Rates
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
    script.type = 'text/javascript';
    script.async = true;
    
    // Masukkan konfigurasi currencies dalam bentuk JSON
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      currencies: [
        "USD",
        "JPY",
        "CNY",
        "SGD",
        "HKD",
        "IDR"
      ],
      isTransparent: true, // Ubah ke false jika ingin background solid
      colorTheme: colorTheme,
      locale: "en"
    });

    // Masukkan script ke dalam DOM
    if (container.current) {
      container.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [colorTheme]);

  return (
    <div className="tradingview-widget-container" style={{ width: '100%', height: '100%' }}>
      <div className="tradingview-widget-container__widget" ref={container} style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}

export default memo(ForexTableWidget);