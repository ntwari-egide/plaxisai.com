import { createSlice } from '@reduxjs/toolkit';

export enum ScanningProgress {
  NOT_STARTED = 'NOT-STARTED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface ScanningState {
  extractingData: ScanningProgress;
  matchesListing: ScanningProgress;
  matchingProfile: ScanningProgress;
}

const initialState: ScanningState = {
  extractingData: ScanningProgress.NOT_STARTED,
  matchesListing: ScanningProgress.NOT_STARTED,
  matchingProfile: ScanningProgress.NOT_STARTED,
};

const trackingProgress = createSlice({
  name: 'trackingProgress',
  initialState,
  reducers: {
    setResumeScanner: (state, action) => {
      state.extractingData = action.payload;
    },
    setMatchesListing: (state, action) => {
      state.matchesListing = action.payload;
    },
    setMatchingProfile: (state, action) => {
      state.matchingProfile = action.payload;
    },
  },
});

export const { setResumeScanner, setMatchesListing, setMatchingProfile } =
  trackingProgress.actions;

export default trackingProgress.reducer;
