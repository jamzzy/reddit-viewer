import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const loadPosts = createAsyncThunk(
    'posts/loadAllPosts',
    async (activeSubreddit) => {
        const data = await fetch(`https://www.reddit.com${activeSubreddit}/.json?raw_json=1`);
        const json = await data.json();
        
        return json;
    }
)

export const posts = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        hasErrorLoadingPosts: false,

    },
    reducers: {

    },
    extraReducers: {
        [loadPosts.pending]: (state, action) => {
            state.isLoadingPosts = true;
            state.hasErrorLoadingPosts = false;

        },
        [loadPosts.fulfilled]: (state, action) => {
            
            state.posts = action.payload.data.children.map(({ data }) => {
                console.log(data.selftext);
                console.log(data.selftext_html);
                return ({
                    author: data.author,
                    created_utc: data.created_utc,
                    media: data.media,
                    num_comments: data.num_comments,
                    permalink: data.permalink,
                    post_hint: data.post_hint,
                    title: data.title,
                    id: uuidv4(),
                    selftext: data.selftext_html,
                    url: data.url,
                    is_video: data.is_video,
                })
            });
            
            state.isLoadingPosts = false;
            state.hasErrorLoadingPosts = false;
        },
        [loadPosts.rejected]: (state, action) => {
            state.isLoadingPosts = false;
            state.hasErrorLoadingPosts = true;

        },
    }
})

export const selectPosts = (state) => state.posts.posts;

export const selectIsLoadingPosts = (state) => state.posts.isLoadingPosts;

export const selectHasErrorLoadingPosts = (state) => state.posts.hasErrorLoadingPosts;

export default posts.reducer;