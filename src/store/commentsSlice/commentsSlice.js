import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadComments = createAsyncThunk(
    'comments/loadAllComments',
    async ({ postID, permalink }) => {

        const data = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await data.json();

        return { json, postID };
    }
)

export const comments = createSlice({
    name: 'comments',
    initialState: {
        comments: {},
        isLoadingComments: false,
        hasErrorLoadingComments: false,
    },
    reducers: {

    },
    extraReducers: {
        [loadComments.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.hasErrorLoadingComments = false;
        },
        [loadComments.fulfilled]: (state, action) => {

            const { json, postID } = action.payload;

            let commentsObj = json[1].data.children.map(({ data }) => {
                return ({
                    author: data.author,
                    body: data.body,
                    created_utc: data.created_utc,

                })
            })

            state.comments[postID] = commentsObj;


            state.isLoadingComments = false;
            state.hasErrorLoadingComments = false;
        },
        [loadComments.rejected]: (state, action) => {
            state.isLoadingComments = false;
            state.hasErrorLoadingComments = true;
        },

    }
})

export const selectComments = (state) => state.comments.comments;

export const selectIsLoadingComments = (state) => state.comments.isLoadingComments;

export const selectHasErrorLoadingComments = (state) => state.comments.hasErrorLoadingComments;

export default comments.reducer;