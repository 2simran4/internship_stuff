import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import './BoxGrid.css';

const BoxGrid = () => {
  return (
    <div className="box-grid-container">
      <div className="box-grid">
        {Array(6).fill().map((_, index) => (
          <div className="box" key={index}>
            <div className="box__section box__section--top">Graph {index + 1}</div>
            <div className="box__section box__section--bottom">
              <ChartContainer index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartContainer = ({ index }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
        const chart = createChart(containerRef.current, {
            width: containerRef.current.clientWidth,
            height: 150,
            layout: {
              backgroundColor: '#ffffff', // Background color of the chart
              textColor: '#333',          // Text color used in the chart
            },
            grid: {
              vertLines: {
                color: 'rgba(0, 0, 0, 0)', // Vertical grid lines color (transparent)
              },
              horzLines: {
                color: 'rgba(0, 0, 0, 0)', // Horizontal grid lines color (transparent)
              },
            },
            crosshair: {
              vertLine: {
                width: 0, // Vertical crosshair line width (invisible)
                color: 'rgba(0, 0, 0, 0)', // Vertical crosshair line color (transparent)
              },
              horzLine: {
                width: 0, // Horizontal crosshair line width (invisible)
                color: 'rgba(0, 0, 0, 0)', // Horizontal crosshair line color (transparent)
              }
            },
            priceScale: {
              borderColor: 'rgba(0, 0, 0, 0)', // Border color of the price scale (transparent)
            },
            timeScale: {
              borderColor: 'rgba(0, 0, 0, 0)', // Border color of the time scale (transparent)
            }
          });

      const lineSeries = chart.addLineSeries();
      lineSeries.setData([
        { time: '2020-01-01', value: 40 + 10 * index },
        { time: '2020-02-01', value: 50 + 10 * index },
        { time: '2020-03-01', value: 55 + 10 * index },
        { time: '2020-04-01', value: 65 + 10 * index },
        { time: '2020-05-01', value: 70 + 10 * index },
      ]);

      // Clean up function to remove the chart on component unmount
      return () => {
        chart.remove();
      };
    }
  }, [index]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default BoxGrid;
