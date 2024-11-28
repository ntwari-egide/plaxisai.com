import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/global/axios-config';

import {
  ResumeEnhancementsRequest,
  ResumeEnhancementState,
} from '../resume-enhancements';

const initialState: ResumeEnhancementState = {
  contentEnhanced: null,
  loading: false,
  error: null,
};

// Async Thunk
export const coverLetterEnhancementsRequest = createAsyncThunk(
  'jobGrader/gradeJob',
  async (request: ResumeEnhancementsRequest) => {
    try {
      const response = await api.post('/enhancements/cover-letter', request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      // logger(error.response?.data || error.message, "Detailed Error");
      throw new Error(
        error.response?.data?.message || 'Failed to grade job description'
      );
    }
  }
);

// Slice
const coverLetterEnhancementsSlice = createSlice({
  name: 'coverLetterEnhancementss',
  initialState,
  reducers: {
    resetGraderState: (state) => {
      state.loading = false;
      state.error = null;
      state.contentEnhanced = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(coverLetterEnhancementsRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(coverLetterEnhancementsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.contentEnhanced = action.payload;
      })
      .addCase(coverLetterEnhancementsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetGraderState } = coverLetterEnhancementsSlice.actions;
export default coverLetterEnhancementsSlice.reducer;
