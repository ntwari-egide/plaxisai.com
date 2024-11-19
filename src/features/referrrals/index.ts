import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface ReferralProfile {
  fullName: string;
  headline: string;
  summary: string;
  profilePicture: string;
  location: string;
  profileURL: string;
  username: string;
}

interface GetReferralsParams {
  companyName: string;
  title: string;
}

interface ReferralsState {
  profiles: ReferralProfile[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  selectedCompany: string | null;
  selectedTitle: string | null;
}

// Initial state
const initialState: ReferralsState = {
  profiles: [],
  loading: false,
  error: null,
  lastUpdated: null,
  selectedCompany: null,
  selectedTitle: null,
};

// Thunk
export const fetchReferrals = createAsyncThunk<
  ReferralProfile[],
  GetReferralsParams,
  { rejectValue: string }
>('referrals/fetchReferrals', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get<ReferralProfile[]>('/api/referrals', {
      params: {
        companyName: params.companyName,
        title: params.title,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return rejectWithValue('Rate limit exceeded. Please try again later.');
      }
      if (error.response?.status === 401) {
        return rejectWithValue('Authentication failed. Please login again.');
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch referrals'
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

// Slice
const referralsSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    resetReferrals: (state) => {
      state.profiles = [];
      state.error = null;
      state.loading = false;
      state.lastUpdated = null;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch referrals';
        state.profiles = [];
      });
  },
});

export const { resetReferrals } = referralsSlice.actions;
export default referralsSlice.reducer;
