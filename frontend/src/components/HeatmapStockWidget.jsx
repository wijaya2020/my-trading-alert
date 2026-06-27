import React, { useEffect, useRef, memo } from 'react';

function HeatmapStockWidget({ dataSource = "SPX500", colorTheme = "dark" }) {
  const container = useRef();

  useEffect(() => {
    // 💡 PERBAIKAN 1: Bersihkan kontainer setiap kali render ulang
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;

    // 💡 PERBAIKAN 2: Gunakan JSON.stringify agar variabel otomatis ter-parsing dengan benar
    script.innerHTML = JSON.stringify({
      dataSource: dataSource, // Nilai ini otomatis mengambil dari props
      blockSize: "market_cap_basic",
      blockColor: "change",
      grouping: "sector",
      locale: "en",
      symbolUrl: "",
      colorTheme: colorTheme, // Nilai ini otomatis mengambil dari props
      exchanges: [],
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: "100%"
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [dataSource, colorTheme]); // 💡 Memastikan widget dirender ulang jika prop ini berubah

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
      </div>
    </div>
  );
}

export default memo(HeatmapStockWidget);