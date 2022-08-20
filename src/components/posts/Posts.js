import { Post } from '../post/Post';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, loadPosts, selectIsLoadingPosts, selectHasErrorLoadingPosts } from '../../store/postsSlice/postsSlice';
import { useEffect } from 'react';
import { LoadSpinner } from '../loadSpinner/LoadSpinner';

export const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const isLoadingPosts = useSelector(selectIsLoadingPosts);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch])

    if (isLoadingPosts) {
        return (
            <div className='posts-container'>
                <LoadSpinner type='posts'/>
            </div>
        );
    }

    return (
        <div className='posts-container'>
            {
                posts.map((post, index) => <Post key={index} post={post} />)
            }
        </div>
    );
}