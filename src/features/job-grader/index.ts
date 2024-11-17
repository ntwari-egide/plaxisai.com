import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/global/axios-config';

// Types
export interface MatchingResult {
  criteria: string;
  number: number;
}

export interface GraderResponse {
  matchingPercentage: number;
  matchingResults: MatchingResult[];
}

export interface GraderRequest {
  resumeText: string;
  jobDescription: string;
}

export interface JobGraderState {
  matchingPercentage: number;
  matchingResults: MatchingResult[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: JobGraderState = {
  matchingPercentage: 0,
  matchingResults: [],
  loading: false,
  error: null,
};

// Async Thunk
export const jobGraderRequest = createAsyncThunk(
  'jobGrader/gradeJob',
  async (request: GraderRequest) => {
    try {
      const response = await api.post('/jobs-matches/jobs-descriptions-grader', request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data as GraderResponse;
    } catch (error) {
      throw new Error('Failed to grade job description');
    }
  }
);

// Slice
const jobGraderSlice = createSlice({
  name: 'jobGrader',
  initialState,
  reducers: {
    resetGraderState: (state) => {
      state.loading = false;
      state.error = null;
      state.matchingPercentage = 0;
      state.matchingResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(jobGraderRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jobGraderRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.matchingPercentage = action.payload.matchingPercentage;
        state.matchingResults = action.payload.matchingResults;
      })
      .addCase(jobGraderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetGraderState } = jobGraderSlice.actions;
export default jobGraderSlice.reducer;