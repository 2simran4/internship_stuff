// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, content }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Indicator Information</h2>
                <p>{content}</p>
                <button onClick={onClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default Modal;

/* Modal.css */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    max-width: 80%;
    text-align: center;
}

.close-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.close-btn:hover {
    background-color: #2980b9;
}

// Indicators.js
import React, { useState } from 'react';
import Modal from './Modal';

const Indicators = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndicators, setSelectedIndicators] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

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
        setModalContent(`Information about ${indicator}`);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
            <Modal show={isModalOpen} onClose={closeModal} content={modalContent} />
        </div>
    );
};

export default Indicators;

