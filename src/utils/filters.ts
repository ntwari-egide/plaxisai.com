// import { filterOptions } from '@/component/response';

/**
 * @param filterOptionName
 * @param response
 * @approach loop through the response, check where the key matches the filterOptionName, and then return the array of values, removing duplicates, the filterOption might be in sub objects, so you need to go all the way down to get the value
 */
export const getFilterOptions = (
  response: any[],
  filterOptionName: string
): { label: string; value: string }[] => {
  const filterOptions: Set<string> = new Set();

  const traverse = (obj: any) => {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    for (const key in obj) {
      if (key === filterOptionName) {
        const filterOption = obj[key];
        if (Array.isArray(filterOption)) {
          filterOption.forEach((option) => filterOptions.add(option));
        } else {
          filterOptions.add(filterOption);
        }
      } else if (typeof obj[key] === 'object') {
        traverse(obj[key]);
      }
    }
  };

  response.forEach((item) => traverse(item));

  return Array.from(filterOptions).map((option) => ({
    label: option,
    value: option,
  }));
};

/**
 * @param jobs
 * @param filterOptions
 * @approach loop through the jobs and check if the job matches the filterOptions, if it does, add it to the filteredJobs array
 */
export const filterJobsHelper = (jobs: any[], filterOptions: any) => {
  // Helper function to traverse nested objects and find the value of a given key
  const traverse = (obj: any, key: string): any => {
    if (typeof obj !== 'object' || obj === null) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj[key];
    }
    for (const k in obj) {
      if (typeof obj[k] === 'object') {
        const result = traverse(obj[k], key);
        if (result !== undefined) {
          return result;
        }
      }
    }
    return undefined;
  };

  const matchesFilter = (
    job: any,
    filterKey: keyof any,
    filterValues: string[]
  ) => {
    if (filterValues.length === 0) return true;
    const jobValue = traverse(job, filterKey as string);
    return Array.isArray(jobValue)
      ? jobValue.some((val) => filterValues.includes(val))
      : filterValues.includes(jobValue);
  };

  return jobs.reduce((filteredJobs, job) => {
    const cloneJob = { ...job };

    const matchesAllFilters = (
      Object.keys(filterOptions) as (keyof any)[]
    ).every((key) => matchesFilter(cloneJob, key, filterOptions[key]));

    // Job must match all specified filters to be included
    if (matchesAllFilters) {
      filteredJobs.push(cloneJob);
    }

    return filteredJobs;
  }, []);
};
