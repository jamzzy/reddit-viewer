import { render, screen } from '@testing-library/react';
import { Comment } from './Comment';
import moment from 'moment';

describe('Comment', () => {

    const testComment = {
        author: "test-user",
        body: "This is a test comment.",
        created_utc: 1662635886
    }

    it('should render username', () => {

        render(<Comment comment={testComment} />);

        expect(screen.getByText(/test-user/i)).toBeInTheDocument();

    });

    it('should render body text', () => {

        render(<Comment comment={testComment} />);

        expect(screen.getByText(/This is a test comment./i)).toBeInTheDocument();
    });

    it('should render timestamp of comment created', () => {

        render(<Comment comment={testComment} />);

        const timestampToMatch = moment.unix(testComment.created_utc).fromNow()

        expect(screen.getByText(timestampToMatch)).toBeInTheDocument();
    });

    it('should render nothing if no comment props is passed', () => {

        const { container } = render(<Comment />);

        expect(container).toBeEmptyDOMElement();
    });
})