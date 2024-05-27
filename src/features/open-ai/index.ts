import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CompanyMatch {
  id: number;
  name: string;
  companyLocation: string;
  matchingCredit: number;
}

interface OpenAIResponse {
  title: string;
  companyMatches: CompanyMatch[];
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
    const response = await fetch('/api/open-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText: resumeText }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    return response.json();
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
