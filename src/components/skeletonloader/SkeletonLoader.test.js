import { render, screen } from '@testing-library/react';
import { SkeletonLoader } from './SkeletonLoader';

describe('SkeletonLoader', () => {

    it('should render the 3 comments skeleton loaders given comments type', () => {

        render(<SkeletonLoader type='comments' />);

        const commentsSkeleton = screen.getAllByTestId('comments-skeleton');

        const postsSkeleton = screen.queryByTestId('posts-skeleton');

        const dropdownSkeleton = screen.queryByTestId('dropdown-skeleton');

        expect(commentsSkeleton).toHaveLength(3);
        expect(postsSkeleton).not.toBeInTheDocument();
        expect(dropdownSkeleton).not.toBeInTheDocument();

    });

    it('should render the 25 posts skeleton loaders given posts type', () => {

        render(<SkeletonLoader type='posts' />);

        const commentsSkeleton = screen.queryByTestId('comments-skeleton');

        const postsSkeleton = screen.getAllByTestId('posts-skeleton');

        const dropdownSkeleton = screen.queryByTestId('dropdown-skeleton');

        expect(postsSkeleton).toHaveLength(25);
        expect(commentsSkeleton).not.toBeInTheDocument();
        expect(dropdownSkeleton).not.toBeInTheDocument();

    });

    it('should render the dropdown skeleton loader given dropdown type', () => {

        render(<SkeletonLoader type='dropdown' />);

        const commentsSkeleton = screen.queryByTestId('comments-skeleton');

        const postsSkeleton = screen.queryByTestId('posts-skeleton');

        const dropdownSkeleton = screen.getByTestId('dropdown-skeleton');

        expect(dropdownSkeleton).toBeInTheDocument();
        expect(commentsSkeleton).not.toBeInTheDocument();
        expect(postsSkeleton).not.toBeInTheDocument();

    });
})