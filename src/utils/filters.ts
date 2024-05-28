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