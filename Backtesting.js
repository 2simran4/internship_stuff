import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import './Backtesting.css';

const Backtesting = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const chartRefs = useRef({});
  const tooltipRef = useRef(null);

  const graphOptions = [
    "Graph 1",
    "Graph 2",
    "Graph 3",
    "Graph 4"
  ];

  useEffect(() => {
    selectedGraphs.forEach(graph => {
      if (!chartRefs.current[graph]) {
        chartRefs.current[graph] = {};
      }
      const container = document.getElementById(`chart-container-${graph}`);
      if (container && !chartRefs.current[graph].chart) {
        const chart = createChart(container, {
          width: container.clientWidth,
          height: 300,
          layout: {
            backgroundColor: '#ddd',
            textColor: '#000',
          },
          grid: {
            vertLines: {
              color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
              color: 'rgba(197, 203, 206, 0.5)',
            },
          },
        });

        const lineSeries = chart.addLineSeries();
        lineSeries.setData([
          { time: '2019-04-11', value: Math.random() * 100 },
          { time: '2019-04-12', value: Math.random() * 100 },
          { time: '2019-04-13', value: Math.random() * 100 },
          { time: '2019-04-14', value: Math.random() * 100 },
          { time: '2019-04-15', value: Math.random() * 100 },
        ]);

        chart.subscribeCrosshairMove(function(param) {
          if (param.time && tooltipRef.current) {
            const price = param.seriesPrices.get(lineSeries);
            tooltipRef.current.innerHTML = `Value: ${price.toFixed(2)}`;
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.style.left = `0px`; // Always on the left
            tooltipRef.current.style.top = `${param.point.y}px`;
          } else {
            if (tooltipRef.current) {
              tooltipRef.current.style.display = 'none';
            }
          }
        });

        chartRefs.current[graph].chart = chart;
      }
    });

    return () => {
      Object.keys(chartRefs.current).forEach(key => {
        if (chartRefs.current[key].chart) {
          chartRefs.current[key].chart.remove();
          chartRefs.current[key].chart = null;
        }
      });
    };
  }, [selectedGraphs]);

  const handleGraphChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGraphs(checked ? [...selectedGraphs, value] : selectedGraphs.filter(item => item !== value));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="backtesting-container">
      <button onClick={toggleDropdown} className="dropdown-toggle-button">
        Choose Graphs
        <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          {graphOptions.map((option, index) => (
            <label key={index} className="dropdown-item">
              <input
                type="checkbox"
                value={option}
                onChange={handleGraphChange}
                checked={selectedGraphs.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      <div className="graphs-container">
        {selectedGraphs.map((graph, index) => (
          <div key={index} id={`chart-container-${graph}`} className="graph">
            {/* Tooltip container */}
            <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', display: 'none' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backtesting;
