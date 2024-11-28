import { Checkbox } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logger from '@/lib/logger';

import { AppDispatch, RootState } from '@/store';

import { resetFilters, setJobs, updateFilters } from '@/features/filters';

type FiltersComponentProps = {
  allJobs: any;
};

const FiltersComponent = ({ allJobs }: FiltersComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.jobsFiltered.allJobs);
  const filters = useSelector((state: RootState) => state.jobsFiltered.filters);

  // Extract unique filter options dynamically
  const companyNames = Array.from(new Set(jobs.map((job) => job.companyName)));
  const employmentTypes = Array.from(
    new Set(jobs.map((job) => job.jobDetails.employmentType))
  );

  const handleCheckboxChange = (filterType: string, value: string) => {
    dispatch(updateFilters({ filterType, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    dispatch(setJobs(allJobs));
  }, [allJobs]);

  return (
    <div className='flex flex-col gap-[3vh]'>
      <h1 className='inter-tight text-[2.4vh] font-semibold text-[#09090d]'>
        Filters
      </h1>

      {/* Company Filters */}
      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Company
        </h1>
        {companyNames.map((company) => (
          <Checkbox
            key={company}
            checked={filters.companyName.includes(company)}
            onChange={() => handleCheckboxChange('companyName', company)}
          >
            {company}
          </Checkbox>
        ))}
      </div>

      {/* Employment Type Filters */}
      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Work Schedule
        </h1>
        {employmentTypes.map((type) => (
          <Checkbox
            key={type}
            checked={filters.employmentType.includes(type)}
            onChange={() => handleCheckboxChange('employmentType', type)}
          >
            {type}
          </Checkbox>
        ))}
      </div>
      <button
        onClick={handleResetFilters}
        className={` cursor-pointer hover:scale-[1.04] transition-all relative text-[#000000] inter-tight place-items-center text-center border-[#000000] py-[1vh] w-[10vw]  border-[2px] rounded-full font-medium`}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FiltersComponent;
