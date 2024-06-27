import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css'; // Import the CSS for styling

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const searchContainerRef = useRef(null);

    const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            const filtered = items.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
            setDropdownVisible(true);
        } else {
            setDropdownVisible(false);
        }
    };

    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="search-container" ref={searchContainerRef}>
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                className="search-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            {isDropdownVisible && (
                <div className="dropdown-content">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div key={index} className="dropdown-item">
                                {item}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
