import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/postsSlice';
import comments from './commentsSlice/commentsSlice';

export default configureStore({
    reducer: {
        posts: posts,
        comments: comments,
    }
});