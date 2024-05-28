import { FilterOptions } from "@/component/response";
import { Job } from "@/features/job-listing";

/**
 * @param filterOptionName
 * @param response 
 * @approach loop through the response, check where the key matches the filterOptionName, and then return the array of values, removing duplicates, the filterOption might be in sub objects, so you need to go all the way down to get the value
 */
export const getFilterOptions = (response: any[], filterOptionName: string): { label: string, value: string }[] => {
    const filterOptions: Set<string> = new Set();

    const traverse = (obj: any) => {
        if (typeof obj !== 'object' || obj === null) {
            return;
        }

        for (const key in obj) {
            if (key === filterOptionName) {
                const filterOption = obj[key];
                if (Array.isArray(filterOption)) {
                    filterOption.forEach(option => filterOptions.add(option));
                } else {
                    filterOptions.add(filterOption);
                }
            } else if (typeof obj[key] === 'object') {
                traverse(obj[key]);
            }
        }
    };

    response.forEach(item => traverse(item));

    return Array.from(filterOptions).map(option => ({ label: option, value: option }));
};

export const filterJobsHelper = (jobs: any[], filterOptions: FilterOptions) => {
    return jobs.reduce((filteredJobs, job) => {
        const cloneJob = { ...job };

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

        // Check if job matches any of the specified filter values for each category
        const matchesCompany = filterOptions.companies.length === 0 || filterOptions.companies.includes(traverse(cloneJob, 'company'));
        const matchesJobProvider = filterOptions.jobProvider.length === 0 || filterOptions.jobProvider.includes(traverse(cloneJob, 'jobProvider'));
        const matchesEmploymentType = filterOptions.employmentType.length === 0 || filterOptions.employmentType.includes(traverse(cloneJob, 'employmentType'));
        const matchesLocation = filterOptions.location.length === 0 || filterOptions.location.includes(traverse(cloneJob, 'location'));

        // Job must match all specified filters to be included
        if (matchesCompany && matchesJobProvider && matchesEmploymentType && matchesLocation) {
            filteredJobs.push(cloneJob);
        }

        return filteredJobs;
    }, []);
};
