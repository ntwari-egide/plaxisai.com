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


// Function to filter jobs based on filter options
export const filterJobsHelper = (jobs: any[], filterOptions: { label: string, value: string }[]) => {
    return jobs.filter(job => {
        return filterOptions.every(filter => {
            const filterKey = filter.label;
            const filterValue = filter.value;

            const traverse = (obj: any): any => {
                if (typeof obj !== 'object' || obj === null) {
                    return null;
                }

                for (const key in obj) {
                    if (key === filterKey) {
                        return obj[key];
                    } else if (typeof obj[key] === 'object') {
                        const result = traverse(obj[key]);
                        if (result) return result;
                    }
                }
                return null;
            };

            const jobValue = traverse(job);
            return jobValue === filterValue;
        });
    });
};
