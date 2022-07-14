import { useRef } from "react";
import './SearchBar.css';

export const SearchBar = () => {
    const searchInputRef = useRef();

    return (
        <form className='search-form'>
            <input type="text" className="search" ref={searchInputRef} placeholder="Search Reddit" />
            <button type="submit" className="search-button">
            🔎
            </button>

        </form>
    );
}