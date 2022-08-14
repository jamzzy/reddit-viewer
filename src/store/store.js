import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        posts: 'posts',
        comments: 'comments',
    }
});