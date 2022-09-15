import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('../components/searchbar/SearchBar', () => ({ SearchBar: () => 'SearchBar Mock' }));
jest.mock('../components/posts/Posts', () => ({ Posts: () => 'Posts Mock' }));
jest.mock('../components/scrolltopbutton/ScrollTopButton', () => ({ ScrollTopButton: () => 'ScrollTopButton Mock' }));
jest.mock('../components/dropdownselect/DropDownSelect', () => ({ DropDownSelect: () => 'DropDownSelect Mock' }));

describe('App', () => {

    it('should render properly', () => {

        render(<App />);

        expect(screen.getByText(/RedditViewer/i)).toBeInTheDocument();
        expect(screen.getByAltText(/reddit viewer logo/i)).toBeInTheDocument();
        expect(screen.getByText(/SearchBar Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/Posts Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/ScrollTopButton Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/DropDownSelect Mock/i)).toBeInTheDocument();

    });

    it('should reload the window when the logo icon is clicked', () => {

        delete window.location
        window.location = {
            ...window.location,
            reload: jest.fn()
        }

        render(<App />);

        const logoIcon = screen.getByAltText(/reddit viewer logo/i);

        fireEvent.click(logoIcon);

        expect(window.location.reload).toHaveBeenCalled();
    });

})