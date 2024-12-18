import { configureStore } from '@reduxjs/toolkit';

import coverLetterEnhancement from './features/cover-letter';
import filters from './features/filters';
import genAI from './features/gen-ai';
import jobGrader from './features/job-grader';
import jobListing from './features/job-listing';
import referrals from './features/referrrals';
import resumeEnhancement from './features/resume-enhancements';
import resumeScanner from './features/resume-scanner';
import trackingProgress from './features/tracking-progress';

export const store = configureStore({
  reducer: {
    // Add the generated reducer here
    resumeScanner: resumeScanner,
    jobListing: jobListing,
    genAI: genAI,
    trackingProgress: trackingProgress,
    jobsFiltered: filters,
    jobGrader: jobGrader,
    referrals: referrals,
    resumeEnhancement: resumeEnhancement,
    coverLetterEnhancement: coverLetterEnhancement,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
