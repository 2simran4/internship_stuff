// Indicators.js
import React, { useState } from 'react';

const Indicators = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndicators, setSelectedIndicators] = useState([]);

    const indicators = ["rsi", "macd", "obv", "ema_5", "ema_13", "ema_26", "vwap", "bb"];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectAll = (e) => {
        if (e.target.checked) {
            setSelectedIndicators(indicators);
        } else {
            setSelectedIndicators([]);
        }
    };

    const toggleIndicator = (indicator) => {
        if (selectedIndicators.includes(indicator)) {
            setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
        } else {
            setSelectedIndicators([...selectedIndicators, indicator]);
        }
    };

    const clearSelection = () => {
        setSelectedIndicators([]);
    };

    const showInfo = (indicator) => {
        alert(`Information about ${indicator}`);
    };

    return (
        <div>
            <button onClick={toggleDropdown}>Dropdown</button>
            {isOpen && (
                <div className="absolute z-10 w-full border border-gray-300 bg-white rounded-md" style={{ top: 'calc(100% + 8px)', maxHeight: '300px', overflowY: 'auto' }}>
                    <div className="flex items-center mb-2 ml-3">
                        <input
                            type="checkbox"
                            id="select-all"
                            className="cursor-pointer"
                            checked={selectedIndicators.length === indicators.length}
                            onChange={selectAll}
                        />
                        <label htmlFor="select-all" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Select All
                        </label>
                    </div>
                    {indicators.map(indicator => (
                        <div key={indicator} className="flex items-center mb-1 ml-3">
                            <input
                                type="checkbox"
                                id={indicator}
                                className="cursor-pointer"
                                checked={selectedIndicators.includes(indicator)}
                                onChange={() => toggleIndicator(indicator)}
                            />
                            <label htmlFor={indicator} className="text-sm font-medium text-gray-700 cursor-pointer">
                                {indicator.toUpperCase()}
                            </label>
                            <button
                                className="ml-2 text-blue-500 cursor-pointer"
                                onClick={() => showInfo(indicator)}
                            >
                                i
                            </button>
                        </div>
                    ))}
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={clearSelection}
                    >
                        Clear Selection
                    </button>
                </div>
            )}
        </div>
    );
};

export default Indicators;
