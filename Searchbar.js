.searchBarContainer {
    position: relative;
    display: inline-block;
    width: 100%;
}

.searchForm {
    display: flex;
    align-items: center;
    position: relative;
}

.searchInput {
    width: 100%;
    padding: 10px 20px 10px 40px; /* Adjust padding to make space for the icon */
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.searchInput::placeholder {
    color: #aaa;
}

.searchForm::before {
    content: url('path/to/search-icon.png'); /* Adjust the path to your icon */
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-content ul li {
    padding: 12px 16px;
    cursor: pointer;
}

.dropdown-content ul li:hover {
    background-color: #ddd;
}

.searchBarContainer:focus-within .dropdown-content {
    display: block;
}
