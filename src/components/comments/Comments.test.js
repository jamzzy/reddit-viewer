import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../test-utils/handlers';
import { renderWithProviders } from "../../test-utils/renderWithProviders";

import { Comments } from '../comments/Comments';

const server = setupServer(...handlers);

describe('Comments', () => {

    //Setup for api mocking
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render loading skeleton and then the comments', async () => {

        const testPermalink = '/r/test-sub-1/comments/test-post-1/';
        const testID = '123';

        renderWithProviders(<Comments postID={testID} permalink={testPermalink} />);

        //Loading comments
        expect(screen.getAllByTestId(/comments-skeleton/i)).toHaveLength(3);

        //After some time, comments are loaded and appear
        const comments = await screen.findAllByText(/test comment/i);
        expect(comments).toHaveLength(3);

    });

})