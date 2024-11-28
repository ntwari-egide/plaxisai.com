import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/global/axios-config';

export interface Job {
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

export interface JobListingState {
  jobs: any[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: JobListingState = {
  jobs: [],
  loading: false,
  error: null,
};

interface _Company {
  companyName: string;
}

export interface RequestJobListing {
  title: string;
  companies: _Company[];
}

export interface _RequestJobListing {
  title: string;
  companies: string[];
}

export const jobListingRequest = createAsyncThunk(
  'jobListing/fetchJobs',
  async (request: _RequestJobListing) => {
    try {
      const jobRequest: RequestJobListing = {
        title: request.title,
        companies: [],
      };

      request.companies.map((company) =>
        jobRequest.companies.push({ companyName: company })
      );

      const response = await api.post('/jobs-matches', jobRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch jobs');
    }
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
