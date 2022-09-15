import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadSubreddits = createAsyncThunk(
    'subreddits/loadAllSubreddits',
    async () => {

        const data = await fetch('https://www.reddit.com/subreddits/.json');
        const json = await data.json();
        const subreddits = json.data.children;

        const icons = await Promise.all(subreddits.map(async ({ data }) => {
            const data2 = await fetch(`https://www.reddit.com${data.url}about/.json`);
            const json2 = await data2.json();
            const icon_img = json2.data.icon_img;

            return icon_img;
        }))


        return { subreddits, icons };
    }
)

export const subreddits = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        activeSubreddit: {},
        isLoadingSubreddits: false,
        hasErrorLoadingSubreddits: false,
    },
    reducers: {
        setActiveSubreddit: (state, action) => {
            state.activeSubreddit = state.subreddits[action.payload];
        },

    },
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoadingSubreddits = true;
            state.hasErrorLoadingSubreddits = false;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.subreddits = action.payload.subreddits.map(({ data }, i) => {
                return ({
                    url: data.url,
                    display_name: data.display_name_prefixed,
                    icon_img: action.payload.icons[i],
                })
            })
            state.activeSubreddit = state.subreddits[0];

            state.isLoadingSubreddits = false;
            state.hasErrorLoadingSubreddits = false;
        },
        [loadSubreddits.rejected]: (state, action) => {
            state.isLoadingSubreddits = false;
            state.hasErrorLoadingSubreddits = true;
        },
    }
})

export const selectSubreddits = (state) => state.subreddits.subreddits;

export const selectActiveSubreddit = (state) => state.subreddits.activeSubreddit;

export const selectIsLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;

export const selectHasErrorLoadingSubreddits = (state) => state.subreddits.hasErrorLoadingSubreddits;

export const { setActiveSubreddit } = subreddits.actions;

export default subreddits.reducer;