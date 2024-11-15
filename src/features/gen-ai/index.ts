import api from '@/global/axios-config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyMatch {
  id: number;
  name: string;
  matchingCredit: number;
  matchingDetails: any[];
}

export interface CareerMatchResponse {
  title: string;
  companyMatches: CompanyMatch[];
}

export interface ResumeValidationError {
  section: string;
  isValid: boolean;
  message: string;
}

export interface ResumeValidationResponse {
  isValid: boolean;
  error: ResumeValidationError[];
}

interface ResumeScanAIState {
  validations: ResumeValidationResponse | null;
  companyMatches: CareerMatchResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeScanAIState = {
  validations: null,
  companyMatches: null,
  loading: false,
  error: null,
};

// Define async thunks with unique action types
export const analyzeResume = createAsyncThunk<ResumeValidationResponse, string>(
  'GenAI/analyzeResume',
  async (resumeText, { rejectWithValue }) => {
    try {
      const response = await api.post('/gen-ai/validate-resume', { resumeText }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to analyze resume');
    }
  }
);

export const careerMatchingAI = createAsyncThunk<CareerMatchResponse, string>(
  'GenAI/careerMatchingAI', // Unique action type here
  async (resumeText, { rejectWithValue }) => {
    try {
      const response = await api.post('/gen-ai/suggest-career-matches', { resumeText }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch career matches');
    }
  }
);

const GenAISlice = createSlice({
  name: 'GenAI',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.validations = null;
      state.companyMatches = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: ResumeScanAIState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: ResumeScanAIState, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred';
    };

    builder
      // analyzeResume cases
      .addCase(analyzeResume.pending, handlePending)
      .addCase(analyzeResume.fulfilled, (state, action: PayloadAction<ResumeValidationResponse>) => {
        state.loading = false;
        state.validations = action.payload;
      })

      // careerMatchingAI cases
      .addCase(careerMatchingAI.pending, handlePending)
      .addCase(careerMatchingAI.fulfilled, (state, action: PayloadAction<CareerMatchResponse>) => {
        state.loading = false;
        state.companyMatches = action.payload;
      })
  },
});

export const { resetState } = GenAISlice.actions;
export default GenAISlice.reducer;