import React, { useEffect, useRef, memo } from 'react';

// Props 'type' bisa diisi: "US", "IDX", atau "CRYPTO"
function MarketSummaryWidget({ type = "US", colorTheme = "light" }) {
  const container = useRef();

  useEffect(() => {
    // 1. Bersihkan kontainer agar tidak render ganda (Konflik React 18)
    container.current.innerHTML = '';

    // 2. Muat Script Utama TradingView (Hanya dimuat sekali di seluruh aplikasi)
    const scriptId = 'tv-market-summary-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://widgets.tradingview-widget.com/w/en/tv-market-summary.js';
      document.body.appendChild(script);
    }

    // 3. Buat elemen <tv-market-summary> secara dinamis via JavaScript
    const widget = document.createElement('tv-market-summary');
    widget.setAttribute('direction', 'horizontal');

    // Tambahkan atribut khusus sesuai jenis market yang dipilih
    if (type === "IDX") {
      widget.setAttribute('exchange', 'IDX');
    } else if (type === "CRYPTO") {
      widget.setAttribute('assets-type', 'crypto');
    }
    // Jika type "US", tidak perlu atribut tambahan karena US adalah default bawaan

    // 4. Masukkan widget ke dalam div kontainer
    container.current.appendChild(widget);

  }, [type, colorTheme]); // useEffect akan dijalankan ulang hanya jika props 'type' berubah

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: '100%' }}>
      {/* Elemen widget akan disuntikkan oleh useEffect ke dalam div ini */}
    </div>
  );
}

// Gunakan memo untuk mencegah re-render yang tidak perlu dari parent
export default memo(MarketSummaryWidget);