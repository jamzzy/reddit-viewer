import { fireEvent, screen } from '@testing-library/react';
import { DropDownSelect } from './DropDownSelect';
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { renderWithProviders } from "../../test-utils/renderWithProviders";

const server = setupServer(...handlers);

describe('DropDownSelect', () => {

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should load then render the active subreddit', async () => {
        renderWithProviders(<DropDownSelect />);

        expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument();
        expect(await screen.findByText(/test-sub/i)).toBeInTheDocument();

    });

    it('should render the dropdown menu when clicked, displaying 3 subreddits total', async () => {

        renderWithProviders(<DropDownSelect />);

        const dropdown = await screen.findByText(/test-sub/i);

        fireEvent.click(dropdown)

        expect(screen.getByRole('list')).toBeInTheDocument();

        const menuItems = screen.getAllByRole('listitem');

        expect(menuItems).toHaveLength(3);

    });

    it('should change the subreddit displayed as active after clicking a different subreddit from dropdown menu, and reflect in store', async () => {

        const { store } = renderWithProviders(<DropDownSelect />);

        const dropdown = await screen.findByText(/test-sub/i);

        fireEvent.click(dropdown)

        const subreddit2ListItem = screen.getByText(/test-sub-2/i);

        fireEvent.click(subreddit2ListItem);

        expect(store.getState().subreddits.activeSubreddit.display_name).toContain('sub-2');
        expect(dropdown).toHaveTextContent('test-sub-2');

    });
})