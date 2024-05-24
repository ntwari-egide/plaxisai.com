import { createSlice } from "@reduxjs/toolkit";

const trackingProgress = createSlice({
    name: 'trackingProgress',
    initialState: {
        resumeScaner: 'NOT-STARTED',
        jobListing: 'NOT-STARTED',
        openAi: 'NOT-STARTED',
    },
    reducers: {
        setResumeScanner: (state, action) => {
            state.resumeScaner = action.payload;
        },
        setJobListing: (state, action) => {
            state.jobListing = action.payload;
        },
        setOpenAi: (state, action) => {
            state.openAi = action.payload;
        },
    },
});

export const { setResumeScanner, setJobListing, setOpenAi } = trackingProgress.actions;

export default trackingProgress.reducer;