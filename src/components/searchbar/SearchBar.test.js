import { fireEvent, screen } from '@testing-library/react';
import { SearchBar } from "./SearchBar";
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { loadSubreddits } from "../../store/subredditsSlice/subredditsSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

const server = setupServer(...handlers);

describe('SearchBar', () => {
    
    //Setup for api mock
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should render properly', () => {

        renderWithProviders(<SearchBar />);

        const searchInput = screen.getByPlaceholderText(/Search/i);
        const magnifyingIcon = screen.getByAltText(/Submit/i);

        expect(searchInput).toBeInTheDocument();
        expect(magnifyingIcon).toBeInTheDocument();
        expect(searchInput).toHaveValue('');

    });

    it('should render a subreddit in the placeholder text if it is active', async () => {

        const { store } = renderWithProviders(<SearchBar />);

        //This is usually dispatched in the dropdown component, needs to be dispatched here for testing
        store.dispatch(loadSubreddits());

        //After sometime the place holder text should have a subreddit
        expect(await screen.findByPlaceholderText(/test-sub-1/i)).toBeInTheDocument();

    });

    it('should render a clear button when text is typed in the search input', () => {

        renderWithProviders(<SearchBar />);

        const search = screen.getByPlaceholderText(/Search/i);

        //Typing something into the searchbar
        fireEvent.change(search, { target: { value: 'test' } });

        expect(screen.getByAltText(/clear search term/i)).toBeInTheDocument();

    });

    it('should update search term in store when text is typed in the search input', () => {

        const { store } = renderWithProviders(<SearchBar />);

        const search = screen.getByPlaceholderText(/Search/i);

        //Typing something into the searchbar
        fireEvent.change(search, { target: { value: 'test' } });

        //Confirming store is behaving properly
        const searchTerm = store.getState().search;
        expect(searchTerm).toBe('test');


    });

    it('should clear search term from store and display and remove clear button when clear button is clicked', () => {

        const { store } = renderWithProviders(<SearchBar />);

        const search = screen.getByPlaceholderText(/Search/i);

        //Typing something into the searchbar
        fireEvent.change(search, { target: { value: 'test' } });

        const clearButton = screen.getByAltText(/clear search term/i);

        expect(store.getState().search).toBe('test');

        //Clicking clear button
        fireEvent.click(clearButton);

        //Expecting store behaviour and search bar is cleared
        expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
        expect(store.getState().search).toBe('');
        expect(clearButton).not.toBeInTheDocument();

    });

})