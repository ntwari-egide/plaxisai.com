import { configureStore } from '@reduxjs/toolkit';

import publicationsSliceReducer from '@/features/publications';
import teamMembersSliceReducer from '@/features/team-members';

export const store = configureStore({
  reducer: {
    teamMembers: teamMembersSliceReducer,
    publications: publicationsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
