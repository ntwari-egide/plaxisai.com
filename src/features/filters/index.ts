import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { filterJobsHelper } from '@/utils/filters';

import { JobListingState } from '../job-listing';

const initialState: JobListingState = {
    jobs: [],
    loading: false,
    error: null,
};

// reset the state
export const resetJobListing = createAsyncThunk(
    'jobListing/reset',
    async (allJobs: any) => {
        return allJobs;
    }
);

// given the filter options, filter the jobs and return the filtered jobs, know that the filter options are an array of objects of type { label: string, value: string }, and the jobs are an array of objects of type Job. Know that the filter options are the keys of the Job object and can have nested hierarchy, so you need to traverse the job object to get the value of the key
export const filterJobs = createAsyncThunk(
    'jobListing/filter',
    async (filterOptions: { label: string, value: string }[]) => {
        const response = await fetch('/api/job-listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filterOptions),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }

        const data: any[] = await response.json();

        // Filter the jobs using the filter options
        const filteredJobs = filterJobsHelper(data, filterOptions);

        return filteredJobs;
    }
);

const filteredJobsListing = createSlice({
    name: 'filteredJobsListing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(filterJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.jobs = action.payload;
            })
            .addCase(filterJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const filteredJobsActions = filteredJobsListing.actions;
export default filteredJobsListing.reducer;