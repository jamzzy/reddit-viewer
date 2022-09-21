import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

//Component Mocks
jest.mock('../components/searchbar/SearchBar', () => ({ SearchBar: () => 'SearchBar Mock' }));
jest.mock('../components/posts/Posts', () => ({ Posts: () => 'Posts Mock' }));
jest.mock('../components/scrolltopbutton/ScrollTopButton', () => ({ ScrollTopButton: () => 'ScrollTopButton Mock' }));
jest.mock('../components/dropdownselect/DropDownSelect', () => ({ DropDownSelect: () => 'DropDownSelect Mock' }));

describe('App', () => {

    it('should render properly', () => {

        render(<App />);
        
        //Expect all the components render in the App
        expect(screen.getByText(/RedditViewer/i)).toBeInTheDocument();
        expect(screen.getByAltText(/reddit viewer logo/i)).toBeInTheDocument();
        expect(screen.getByText(/SearchBar Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/Posts Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/ScrollTopButton Mock/i)).toBeInTheDocument();
        expect(screen.getByText(/DropDownSelect Mock/i)).toBeInTheDocument();

    });

    it('should reload the window when the logo icon is clicked', () => {

        //Setup and mocking window.location
        delete window.location
        window.location = {
            ...window.location,
            reload: jest.fn()
        }

        render(<App />);

        //Looking for the app Logo
        const logoIcon = screen.getByAltText(/reddit viewer logo/i);

        fireEvent.click(logoIcon);

        //App should refresh when clicked
        expect(window.location.reload).toHaveBeenCalled();
    });

})