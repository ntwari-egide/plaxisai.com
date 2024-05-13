import { configureStore } from '@reduxjs/toolkit';

import resumeScanner from './features/resume-scanner';

export const store = configureStore({
  reducer: {
    // Add the generated reducer here
    resumeScanner: resumeScanner,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
