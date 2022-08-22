import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/postsSlice';
import comments from './commentsSlice/commentsSlice';
import subreddits from './subredditsSlice/subredditsSlice';

export default configureStore({
    reducer: {
        subreddits: subreddits,
        posts: posts,
        comments: comments,
    }
});