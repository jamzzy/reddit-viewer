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

        store.dispatch(loadSubreddits());

        const postsSkeleton = screen.getAllByTestId('posts-skeleton');

        expect(postsSkeleton).toHaveLength(25);

        const posts = await screen.findAllByText(/test self text/i);

        expect(posts).toHaveLength(2);

    })

})