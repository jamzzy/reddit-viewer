import { Post } from '../post/Post';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, loadPosts, selectIsLoadingPosts, selectHasErrorLoadingPosts } from '../../store/postsSlice/postsSlice';
import { useEffect } from 'react';

export const Posts = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const isLoadingPosts = useSelector(selectIsLoadingPosts);
    

    console.log(isLoadingPosts + "posts below: ");
    console.log(posts);

    useEffect(() => {
        console.log("huh nani");
        dispatch(loadPosts());
    }, [dispatch])

    if (isLoadingPosts) {
        console.log('adfadfadfadfadfadfadfadfa')
        return <div>loading</div>;
    }

    return (
        <div className='posts-container'>
            {
                
                    posts.map((post, index) => <Post key={index} post={post} />)

                
                
            }
            <Post />
            <Post />
        </div>

    );
}