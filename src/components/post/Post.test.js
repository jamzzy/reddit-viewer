import { fireEvent, render, screen } from '@testing-library/react';
import { Post } from './Post';
import moment from 'moment';

jest.mock('../comments/Comments', () => ({ Comments: () => 'Comments True' }));

describe('Post', () => {

    const testPost = {
        author: 'test-author',
        created_utc: 1662635886,
        num_comments: 100,
        title: 'This is a test title',
        id: 1234,
        url: 'www.testurl.com'

    }

    it('should return nothing if post prop is empty', () => {

        const { container } = render(<Post />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render the post title and post information', () => {

        render(<Post post={testPost} />);

        const title = screen.getByText('This is a test title');

        const commentCount = screen.getByText(/100/i);

        const timestampToMatch = moment.unix(1662635886).fromNow();

        const creationTime = screen.getByText(/posted/i);

        const author = screen.getByText('test-author');

        expect(title).toBeInTheDocument();
        expect(commentCount).toBeInTheDocument();
        expect(creationTime).toBeInTheDocument();
        expect(creationTime).toHaveTextContent(timestampToMatch);
        expect(author).toBeInTheDocument();

    });

    it('should not render any comments initially', () => {

        render(<Post post={testPost} />);

        const comments = screen.queryByText(/Comments True/i);

        expect(comments).not.toBeInTheDocument();
    });

    it('should render the comments section when the comments icon is clicked', () => {

        render(<Post post={testPost} />);

        const commentIcon = screen.getByAltText(/comments/i);
        fireEvent.click(commentIcon);
        const comments = screen.getByText(/Comments True/i);

        expect(comments).toBeInTheDocument();
    });

    it('should render an img if post_hint is image', () => {

        const testPostImg = {
            ...testPost,
            post_hint: 'image'
        }

        render(<Post post={testPostImg} />);

        const postImg = screen.getByAltText(testPostImg.title);

        expect(postImg).toBeInTheDocument();
        expect(postImg.src).toContain(testPostImg.url);

    });

    it('should render a link if post_hint is link', () => {
        const testPostLink = {
            ...testPost,
            post_hint: 'link'
        }

        render(<Post post={testPostLink} />);

        const link = screen.getByText(testPostLink.url);

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', testPostLink.url);

    });

    it('should render a link if post_hint is rich:video', () => {
        const testPostLink = {
            ...testPost,
            post_hint: 'rich:video'
        }

        render(<Post post={testPostLink} />);

        const link = screen.getByText(testPostLink.url);

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', testPostLink.url);

    });

    it('should render a link if the url contains gallery', () => {
        const testPostLink = {
            ...testPost,
            url: 'www.reddit.com/gallery',
        }

        render(<Post post={testPostLink} />);

        const link = screen.getByText(testPostLink.url);

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', testPostLink.url);

    });

    it('should render a text post if there exists content in selftext', () => {
        const testPostSelfText = {
            ...testPost,
            selftext: 'This is a test text post.'
        }

        render(<Post post={testPostSelfText} />);

        const selftext = screen.getByText('This is a test text post.');

        expect(selftext).toBeInTheDocument();

    });

    it('should render video if post_hint is hosted:video', () => {

        const testPostVideo = {
            ...testPost,
            media: {
                reddit_video: {
                    fallback_url: 'www.videotesturl.com'
                }
            },
            post_hint: 'hosted:video',
            is_video: true,
        }

        render(<Post post={testPostVideo} />);

        const video = screen.getByTestId(/video-post-test/i);

        expect(video).toBeInTheDocument();
        expect(video.innerHTML).toContain('www.videotesturl.com');

    });

})