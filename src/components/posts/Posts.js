import { Post } from '../post/Post';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, loadPosts, selectIsLoadingPosts, selectHasErrorLoadingPosts } from '../../store/postsSlice/postsSlice';
import { useEffect } from 'react';
import { SkeletonLoader } from '../skeletonloader/SkeletonLoader';
import { selectActiveSubreddit, selectIsLoadingSubreddits } from '../../store/subredditsSlice/subredditsSlice';
import { selectSearchTerm } from '../../store/searchSlice/searchSlice';

export const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const isLoadingPosts = useSelector(selectIsLoadingPosts);
    const activeSubreddit = useSelector(selectActiveSubreddit);
    const isLoadingSubreddits = useSelector(selectIsLoadingSubreddits);
    const searchTerm = useSelector(selectSearchTerm);
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    

    useEffect(() => {
        
       if(activeSubreddit.url === undefined){
        return;
       }
        dispatch(loadPosts(activeSubreddit.url));

        
        
    }, [dispatch, activeSubreddit])

    if (isLoadingPosts || isLoadingSubreddits) {
        return (
            <div className='posts-container'>
                <SkeletonLoader type='posts'/>
            </div>
        );
    }

    return (
        <div className='posts-container'>
            {
                filteredPosts.map((post, index) => <Post key={index} post={post} />)
            }
        </div>
    );
}