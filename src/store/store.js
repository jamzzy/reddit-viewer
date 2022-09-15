import { combineReducers, configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/postsSlice';
import comments from './commentsSlice/commentsSlice';
import subreddits from './subredditsSlice/subredditsSlice';
import search from './searchSlice/searchSlice';

const rootReducer = combineReducers({
    subreddits: subreddits,
    posts: posts,
    comments: comments,
    search: search,
})

export default configureStore({
    reducer: rootReducer
});

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}