import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/postsSlice';

export default configureStore({
    reducer: {
        posts: posts,
        comments: 'comments',
    }
});