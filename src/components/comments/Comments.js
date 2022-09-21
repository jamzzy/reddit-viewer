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

    //Dispatch loadComments, gets the comments for the post through the reddit api
    useEffect(() => {
        dispatch(loadComments({ postID, permalink }));

    }, [dispatch, permalink, postID]);

    //When the comments are loading, a loading skeleton is displayed 
    if (isLoadingComments) {
        return (
            <div className='comments-container'>
                <SkeletonLoader type={'comments'} />
            </div>
        )
    }

    //When an error has occured loading comments, an error message is displayed
    if (hasErrorLoadingComments) {
        return (
            <div className='comments-container'>
                <ErrorHandler errorMsg='comments' />
            </div>
        )

    }

    //When comments don't exist for the given postID, returns null
    if (!comments[postID]) {
        return null;
    }

    //returns a container, containing comment components to display the comments
    return (
        <div className='comments-container'>
            {
                comments[postID].map((comment, index) => <Comment key={index} comment={comment} />)
            }
        </div>
    );
}