import './ScrollTopButton.css';
import React, { useState } from 'react';
import arrowUp from '../../data/icons/arrow-up.png';
export const ScrollTopButton = () => {

    const [visible, setVisible] = useState(false);

    //The back to top button appears when the user has scrolled down a bit
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    };

    //Scrolls back to top of the app
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    //Scroll listener for the button to appear
    window.addEventListener('scroll', toggleVisible);

    /*
    Returns the back to top button JSX. Will allow the user to scroll all the way to the
    top of the app. When visible state is true, the button appears, otherwise its invisible.
    */

    if (visible) {
        return (
            <div data-testid='scrollTopButtonVisible' className='scroll-top fade-in' onClick={scrollToTop}>
                <img className='arrow-up-icon' src={arrowUp} alt='scroll-to-top' />
            </div>
        )
    }

    return (
        <div data-testid='scrollTopButtonInvisible' className='scroll-top' onClick={scrollToTop}>
            <img className='arrow-up-icon' src={arrowUp} alt='scroll-to-top' />
        </div>
    )

}