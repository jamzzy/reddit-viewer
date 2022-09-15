import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { renderWithProviders } from "../../test-utils/renderWithProviders";

import { Comments } from '../comments/Comments';

const server = setupServer(...handlers);

describe('Comments', () => {

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render loading skeleton and then the comments', async () => {

        const testPermalink = '/r/test-sub-1/comments/test-post-1/';
        const testID = '123';

        renderWithProviders(<Comments postID={testID} permalink={testPermalink} />);

        expect(screen.getAllByTestId(/comments-skeleton/i)).toHaveLength(3);

        const comments = await screen.findAllByText(/test comment/i);

        expect(comments).toHaveLength(3);

    });

})