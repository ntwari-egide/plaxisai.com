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
  jobs: any[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: JobListingState = {
  jobs: [],
  loading: false,
  error: null,
};

export interface RequestJobListing {
  title: string;
  company: string;
  companyLocation: string;
}

export const jobListingRequest = createAsyncThunk(
  'jobListing/fetchJobs',
  async (request: any) => {
    const response = await fetch('/api/job-listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();

    console.log('validJobResults', data);

    return data;
  }
);

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
      .addCase(jobListingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jobListingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(jobListingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetState } = jobListingSlice.actions;
export default jobListingSlice.reducer;
