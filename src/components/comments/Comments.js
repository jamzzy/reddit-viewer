import { Comment } from '../comment/Comment';
import './Comments.css';
import {
    selectComments,
    selectIsLoadingComments,
    loadComments,
    selectHasErrorLoadingComments
} from '../../store/commentsSlice/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SkeletonLoader } from '../skeletonloader/SkeletonLoader';
import { ErrorHandler } from '../errorhandler/ErrorHandler';

export const Comments = ({ postID, permalink }) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const isLoadingComments = useSelector(selectIsLoadingComments);
    const hasErrorLoadingComments = useSelector(selectHasErrorLoadingComments);

    useEffect(() => {
        dispatch(loadComments({ postID, permalink }));

    }, [dispatch, permalink, postID]);

    if (isLoadingComments) {
        return (
            <div className='comments-container'>
                <SkeletonLoader type={'comments'} />
            </div>
        )
    }

    if (hasErrorLoadingComments) {
        return (
            <div className='comments-container'>
                <ErrorHandler errorMsg='comments'/>
            </div>
        )

    }

    if (!comments[postID]) {
        return null;
    }

    return (
        <div className='comments-container'>
            {
                comments[postID].map((comment, index) => <Comment key={index} comment={comment} />)
            }
        </div>
    );
}