import React from "react";
import "./SearchBar.css";

import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    return (

        <div className="search-container">

            <FaSearch className="search-icon"/>

            <input

                type="text"

                placeholder="Search medical records..."

            />

        </div>

    );

};

export default SearchBar;