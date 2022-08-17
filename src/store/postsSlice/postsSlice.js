import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadPosts = createAsyncThunk(
    'posts/loadAllPosts',
    async () => {
        const data = await fetch('https://www.reddit.com/r/mildlyinteresting/.json');
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
            console.log(action.payload.data.children);
            state.posts = action.payload.data.children.map(({data}) => {
                console.log(data);
                return ({
                    author: data.author,
                    created_utc: data.created_utc,
                    media: (data.post_hint === "hosted:video" ? data.media.reddit_video.fallback_url : (data.post_hint === "image" ? data.url : "")),
                    num_comments: data.num_comments,
                    permalink: data.permalink,
                    post_hint: data.post_hint,
                    title: data.title,

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

export const selectIsLoadingPosts = (state) =>  state.posts.isLoadingPosts;

export const selectHasErrorLoadingPosts = (state) => state.posts.hasErrorLoadingPosts;

export default posts.reducer;