import { configureStore } from '@reduxjs/toolkit';

import jobListing from './features/job-listing';
import openAi from './features/open-ai';
import resumeScanner from './features/resume-scanner';
import trackingProgress from './features/tracking-progress';

export const store = configureStore({
  reducer: {
    // Add the generated reducer here
    resumeScanner: resumeScanner,
    jobListing: jobListing,
    openAI: openAi,
    trackingProgress: trackingProgress,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
