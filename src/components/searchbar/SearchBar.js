import { useRef } from "react";
import './SearchBar.css';
import magnifyingGlass from '../../data/icons/magnifying-glass.png';

export const SearchBar = () => {
    const searchInputRef = useRef();

    return (
        <form className='search-form'>
            <input type="text" className="search" ref={searchInputRef} placeholder="Search Reddit" />
            
            <input type='image' className='search-img-input' src={magnifyingGlass} alt="Submit Search"/>

        </form>
    );
}