import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobDetails {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  location: string;
  employmentType: string;
  datePosted: string;
  salaryRange: string;
  jobProviders: any[];
}

interface Job {
  id: number;
  companyName: string;
  title: string;
  jobDetails: JobDetails;
}

interface JobState {
  allJobs: Job[];
  filteredJobs: Job[];
  filters: {
    companyName: string[];
    employmentType: string[];
  };
}

const initialState: JobState = {
  allJobs: [],
  filteredJobs: [],
  filters: {
    companyName: [],
    employmentType: [],
  },
};

const jobFiltersSlice = createSlice({
  name: 'jobFilters',
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.allJobs = action.payload;
      state.filteredJobs = action.payload; // Initially, show all jobs
    },
    updateFilters(
      state,
      action: PayloadAction<{ filterType: string; value: string }>
    ) {
      const { filterType, value } = action.payload;
      if (
        state.filters[filterType as keyof typeof state.filters].includes(value)
      ) {
        state.filters[filterType as keyof typeof state.filters] = state.filters[
          filterType as keyof typeof state.filters
        ].filter((item) => item !== value);
      } else {
        state.filters[filterType as keyof typeof state.filters].push(value);
      }

      // Filter jobs
      state.filteredJobs = state.allJobs.filter((job) => {
        const matchesCompany =
          state.filters.companyName.length === 0 ||
          state.filters.companyName.includes(job.companyName);

        const matchesEmployment =
          state.filters.employmentType.length === 0 ||
          state.filters.employmentType.includes(job.jobDetails.employmentType);

        return matchesCompany && matchesEmployment;
      });
    },
    resetFilters(state) {
      state.filters = { companyName: [], employmentType: [] };
      state.filteredJobs = state.allJobs; // Reset to show all jobs
    },
  },
});

export const { setJobs, updateFilters, resetFilters } = jobFiltersSlice.actions;
export default jobFiltersSlice.reducer;
