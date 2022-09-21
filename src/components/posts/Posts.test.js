import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import { loadSubreddits } from '../../store/subredditsSlice/subredditsSlice';

import { Posts } from './Posts';

const server = setupServer(...handlers);

describe('Posts', () => {

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render the loading skeleton and then the posts', async () => {

        const { store } = renderWithProviders(<Posts />);

        /*
        This is usually dispatched in the dropdown component, 
        In order to test the posts component, need to load subreddits for testing
        */
        store.dispatch(loadSubreddits());

        //Loading skeleton displays when posts are loading
        const postsSkeleton = screen.getAllByTestId('posts-skeleton');
        expect(postsSkeleton).toHaveLength(25);

        //After some time, the posts should appear
        const posts = await screen.findAllByText(/test self text/i);
        expect(posts).toHaveLength(2);

    })

})