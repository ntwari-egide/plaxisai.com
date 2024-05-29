import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FilterOptions } from '@/component/response';
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
interface FilterJobsProps {
  jobs: any[];
  filterOptions: FilterOptions;
}
export const filterJobs = createAsyncThunk(
  'jobListing/filter',
  async ({ jobs, filterOptions }: FilterJobsProps) => {
    // Filter the jobs using the filter options
    //remove 'company' in filterOptions.companies array
    filterOptions.companies = filterOptions.companies.filter((company) => company !== 'company');

    const filteredJobs = filterJobsHelper(jobs, filterOptions);

    return filteredJobs;
  }
);

const filteredJobsListing = createSlice({
  name: 'filteredJobsListing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetJobListing.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(resetJobListing.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(resetJobListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
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
