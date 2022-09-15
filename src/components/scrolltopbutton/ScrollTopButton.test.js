import { fireEvent, render, screen } from '@testing-library/react';
import { ScrollTopButton } from './ScrollTopButton';

describe('ScrollTopButton', () => {

    it('should render intially with opacity of 0', () => {

        render(<ScrollTopButton />);

        const scrollTopButton = screen.getByTestId('scrollTopButtonInvisible');

        expect(scrollTopButton).toBeInTheDocument();
        expect(scrollTopButton).not.toHaveClass('fade-in');

    });

    it('should render with opacity 1 after scrolling down past 300 pixels', () => {

        document.documentElement.scrollTop = 350;

        render(<ScrollTopButton />);

        fireEvent.scroll(window, { target: { scrollY: 350 } });

        const scrollTopButton = screen.getByTestId(/scrollTopButton/i);

        expect(scrollTopButton).toHaveClass('fade-in');
    });

    it('should scroll to top when clicked', () => {

        window.scrollTo = jest.fn();

        render(<ScrollTopButton />);

        const scrollTopButton = screen.getByTestId(/scrollTopButton/i);

        fireEvent.click(scrollTopButton);

        expect(window.scrollTo).toHaveBeenCalled();
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })


})