import './DropDownSelect.css';
import React, {useState, useEffect} from 'react';
import {
    loadSubreddits,
    selectSubreddits,
    selectActiveSubreddit,
    selectIsLoadingSubreddits,
    setActiveSubreddit} from '../../store/subredditsSlice/subredditsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const DropDownSelect = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const activeSubreddit = useSelector(selectActiveSubreddit);
    const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
   

    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        dispatch(loadSubreddits());
        
    }, [dispatch]);

    useEffect(() => {
        if(subreddits[selectedIndex]){
            dispatch(setActiveSubreddit(selectedIndex));
        }
        
    },[dispatch, selectedIndex, subreddits])

    useEffect(() => {
        setShowDropDown(false);
    },[selectedIndex]);

    const handleOnClick = () => {
        setShowDropDown(true);
    }

    const handleOnMouseLeave = () => {
        setShowDropDown(false);
    }
    
    if(isLoadingSubreddits) {
        return <div>loading subreddits</div>

    }

    return (
        <div className='dropdown-select-container' >
            <div className='selected-container'  onClick={handleOnClick} onMouseLeave={handleOnMouseLeave}>
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
                                <h1 className='selected-label'>{subreddit.display_name}</h1>
                            </li>
                        ))
                    }
                </ul>
            </div>
          
        ) : <></>}
        </div>
              
    )
}