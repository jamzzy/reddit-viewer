import './DropDownSelect.css';
import React, { useState, useEffect } from 'react';
import {
    loadSubreddits,
    selectSubreddits,
    selectActiveSubreddit,
    selectIsLoadingSubreddits,
    selectHasErrorLoadingSubreddits,
    setActiveSubreddit
} from '../../store/subredditsSlice/subredditsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SkeletonLoader } from '../skeletonloader/SkeletonLoader';
import { clearSearchTerm } from '../../store/searchSlice/searchSlice';
import { ErrorHandler } from '../errorhandler/ErrorHandler';

export const DropDownSelect = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const activeSubreddit = useSelector(selectActiveSubreddit);
    const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
    const hasErrorLoadingSubreddits = useSelector(selectHasErrorLoadingSubreddits);


    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //Loading subreddits through the reddit api
    useEffect(() => {
        dispatch(loadSubreddits());

    }, [dispatch]);

    //Setting the active subreddit 
    useEffect(() => {
        if (subreddits[selectedIndex]) {
            dispatch(setActiveSubreddit(selectedIndex));
            dispatch(clearSearchTerm());
        }

    }, [dispatch, selectedIndex, subreddits])

    //When a different subreddit is selected, the dropdown menu is closed
    useEffect(() => {
        setShowDropDown(false);
    }, [selectedIndex]);

    const handleOnClick = () => {
        setShowDropDown(true);
    }

    const handleOnMouseLeave = () => {
        setShowDropDown(false);
    }

    //When subreddits are loading, a skeleton loader is displayed
    if (isLoadingSubreddits) {
        return (
            <div className='dropdown-select-container'>
                <SkeletonLoader type='dropdown' />
            </div>
        )

    }

    //When an error occurs loading the subreddits, an error message is displayed
    if (hasErrorLoadingSubreddits) {
        return (
            <div className='dropdown-select-container'>
                <ErrorHandler errorMsg='subreddits' />
            </div>
        )
    }

    //Returns the jsx for the dropdown container, and the dropdown menu when clicked
    return (
        <div className='dropdown-select-container' >
            <div className='selected-container' onClick={handleOnClick} onMouseLeave={handleOnMouseLeave}>
                <img className='dropdown-icon' src={activeSubreddit.icon_img ? activeSubreddit.icon_img : 'https://cdn-icons-png.flaticon.com/512/892/892692.png'} alt={activeSubreddit.url} />
                <h1 className='selected-label'>{activeSubreddit.display_name}</h1>


            </div>
            {showDropDown ? (
                <div className='dropdown-menu dropdown_menu-6' onMouseEnter={handleOnClick} onMouseLeave={handleOnMouseLeave}>
                    <ul>
                        {
                            subreddits.map((subreddit, i) => (
                                <li className='dropdown-item' key={i} onClick={() => setSelectedIndex(i)}>
                                    <img className='dropdown-icon' src={subreddit.icon_img ? subreddit.icon_img : 'https://cdn-icons-png.flaticon.com/512/892/892692.png'} alt={subreddit.url} />
                                    <h1 className='menu-label'>{subreddit.display_name}</h1>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            ) : <></>}
        </div>

    )
}