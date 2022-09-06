import './ScrollTopButton.css';
import React, { useState } from 'react';
import arrowUp from '../../data/icons/arrow-up.png';
export const ScrollTopButton = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible);

    if (visible) {
        return (
            <div className='scroll-top fade-in' onClick={scrollToTop}>
                <img className='arrow-up-icon' src={arrowUp} alt='scroll-to-top' />
            </div>
        )
    }

    return (
        <div className='scroll-top' onClick={scrollToTop}>
            <img className='arrow-up-icon' src={arrowUp} alt='scroll-to-top' />
        </div>
    )

}