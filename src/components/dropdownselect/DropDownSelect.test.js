import { fireEvent, screen } from '@testing-library/react';
import { DropDownSelect } from './DropDownSelect';
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { renderWithProviders } from "../../test-utils/renderWithProviders";

const server = setupServer(...handlers);

describe('DropDownSelect', () => {

    //Setup for api mock
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should load then render the active subreddit', async () => {
        renderWithProviders(<DropDownSelect />);

        //Loading skeleton displayed when subreddits are loading
        expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument();

        //After some time, an active subreddit should appear
        expect(await screen.findByText(/test-sub/i)).toBeInTheDocument();

    });

    it('should render the dropdown menu when clicked, displaying 3 subreddits total', async () => {

        renderWithProviders(<DropDownSelect />);

        //After some time an active subreddit should appear
        const dropdown = await screen.findByText(/test-sub/i);

        //Click the container so the dropdown menu appears
        fireEvent.click(dropdown)
        expect(screen.getByRole('list')).toBeInTheDocument();

        //The menu should have 3 items populating it
        const menuItems = screen.getAllByRole('listitem');
        expect(menuItems).toHaveLength(3);

    });

    it('should change the subreddit displayed as active after clicking a different subreddit from dropdown menu, and reflect in store', async () => {

        const { store } = renderWithProviders(<DropDownSelect />);
         
        //After some time an active subreddit should appear
        const dropdown = await screen.findByText(/test-sub/i);

        //Click the container
        fireEvent.click(dropdown)

        //Clicking/Selecting a different subreddit to be the active subreddit
        const subreddit2ListItem = screen.getByText(/test-sub-2/i);
        fireEvent.click(subreddit2ListItem);

        //The selected subreddit should be the active subreddit
        expect(store.getState().subreddits.activeSubreddit.display_name).toContain('sub-2');
        expect(dropdown).toHaveTextContent('test-sub-2');

    });
})