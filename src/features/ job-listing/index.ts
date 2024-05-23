import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  location: string;
  employmentType: string;
  datePosted: string;
  salaryRange: string;
  jobProviders: any[];
}

interface JobListingState {
  jobs: Job[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: JobListingState = {
  jobs: [],
  loading: false,
  error: null,
};

export const jobListing = createAsyncThunk('jobListing/fetchJobs', async () => {
  const response = await fetch('/api/job-listing');

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
});


// slice
const jobListingSlice = createSlice({
  name: 'jobListing',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(jobListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jobListing.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(jobListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetState } = jobListingSlice.actions;
export default jobListingSlice.reducer;