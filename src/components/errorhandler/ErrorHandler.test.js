import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorHandler } from './ErrorHandler';

describe('ErrorHandler', () => {

    it('should render the proper error message', () => {

        const expectedErrorMsg = 'Error loading posts. Try refresh.';

        render(<ErrorHandler errorMsg={'posts'} />);

        expect(screen.getByText(expectedErrorMsg)).toBeInTheDocument();
    });

    it('should render a refresh icon', () => {

        render(<ErrorHandler errorMsg={'posts'} />);
        const refreshIcon = screen.queryByAltText(/reload/i);

        expect(refreshIcon).toBeInTheDocument();
        expect(refreshIcon).toHaveClass('refresh-icon');
    });

    it('should reload the window when the refresh icon is clicked', () => {

        //Mocking window.location
        delete window.location
        window.location = {
            ...window.location,
            reload: jest.fn()
        }

        render(<ErrorHandler errorMsg={'posts'} />);
        const refreshIcon = screen.getByAltText(/reload/i);

        //Clicking refresh icon
        fireEvent.click(refreshIcon);

        //Should call the window.location.reload function
        expect(window.location.reload).toHaveBeenCalled();

    });
})