import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CompanyMatch {
  id: number;
  name: string;
  companyLocation: string;
  matchingCredit: number;
}

interface OpenAIResponse {
  validity: {
    isValid: boolean;
    errors: {
      section: string;
      isValid: boolean;
      message: string;
    }[];
  };
  analysis: {
    title: string;
    companyMatches: CompanyMatch[];
  };
}

interface OpenAIState {
  response: OpenAIResponse | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: OpenAIState = {
  response: null,
  loading: false,
  error: null,
};

export const analyzeResume = createAsyncThunk<OpenAIResponse, string>(
  'openai/analyzeResume',
  async (resumeText) => {
    try {
      const response = await axios.post(
        'api/open-ai',
        { resumeText },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Failed to analyze resume');
    }
  }
);

const openAISlice = createSlice({
  name: 'openai',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetState } = openAISlice.actions;
export default openAISlice.reducer;
