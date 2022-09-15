import { useSelector, useDispatch } from "react-redux";
import './SearchBar.css';
import magnifyingGlass from '../../data/icons/magnifying-glass.png';
import {
    setSearchTerm,
    clearSearchTerm,
    selectSearchTerm
} from '../../store/searchSlice/searchSlice.js';
import { selectActiveSubreddit } from '../../store/subredditsSlice/subredditsSlice'
import React from "react";

export const SearchBar = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const activeSubreddit = useSelector(selectActiveSubreddit);

    const onSearchChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const onSearchTermClearHandler = () => {
        dispatch(clearSearchTerm());
    }

    return (
        <div className='search-container'>
            <img className='search-img-input' src={magnifyingGlass} alt="Submit Search" />
            <input type="text" className="search" value={searchTerm} onChange={onSearchChangeHandler} placeholder={'Search ' + (activeSubreddit.display_name ? activeSubreddit.display_name : 'Reddit')} />

            {
                searchTerm.length > 0 && (
                    <button className='clear-button' type='button' onClick={onSearchTermClearHandler}>
                        <img src={'https://cdn-icons-png.flaticon.com/512/60/60994.png'} className='clear-icon' alt="clear search term" />
                    </button>
                )
            }


        </div>
    );
}