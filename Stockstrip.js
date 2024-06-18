import React, { useEffect, useState } from 'react';
import './StockStrip.css';

const StockStrip = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Dummy market data
    const dummyData = [
      { name: 'NIFTY 50', value: 10002.00, change: 0.31 },
      { name: 'SENSEX', value: 33945.18, change: 0.24 },
      { name: 'BAJFINANCE', value: 7341.55, change: 0.64 },
      { name: 'TCS', value: 3021.45, change: -0.15 },
      { name: 'RELIANCE', value: 2121.30, change: 0.85 },
      // Add more stocks as needed
    ];

    setMarketData(dummyData);
  }, []);

  return (
    <div className="stock-strip-container">
      <div className="stock-strip">
        {marketData.map((stock, index) => (
          <div className="stock-strip__item" key={index}>
            {stock.name} <span>{stock.value}</span> <span className={stock.change > 0 ? 'positive' : 'negative'}>{stock.change}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockStrip;
import React from 'react';

function App() {
  const openPopup = () => {
    window.open("", "popup", "width=700,height=7000");
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
    </div>
  );
}

export default App;
