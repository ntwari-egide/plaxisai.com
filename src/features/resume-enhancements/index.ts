import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/global/axios-config';

export interface Results {
  matchingPercentage: string;

  matchingResults: any[];
}

export interface ResumeEnhancement {
  id: number;

  newContent: string;

  results?: Results;
}

export interface ResumeEnhancementState {
  contentEnhanced: ResumeEnhancement | null;
  loading: boolean;
  error: string | null | undefined;
}

export interface ResumeEnhancementsRequest {
  resumeText: string;

  jobDescription: string;

  generatedContent?: string;

  userPrompt?: string;
}

const initialState: ResumeEnhancementState = {
  contentEnhanced: null,
  loading: false,
  error: null,
};

// Async Thunk
export const resumeEnhancementRequest = createAsyncThunk(
  'jobGrader/gradeJob',
  async (request: ResumeEnhancementsRequest) => {
    try {
      const response = await api.post('/enhancements/resume', request, {
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
const resumeEnhancementSlice = createSlice({
  name: 'resumeEnhancements',
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
      .addCase(resumeEnhancementRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resumeEnhancementRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.contentEnhanced = action.payload;
      })
      .addCase(resumeEnhancementRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetGraderState } = resumeEnhancementSlice.actions;
export default resumeEnhancementSlice.reducer;
