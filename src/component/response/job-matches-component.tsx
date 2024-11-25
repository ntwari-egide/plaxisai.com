import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import JobMatch from '../matches/job';

const JobMatchesComponent = () => {
  const filteredJobs = useSelector(
    (state: RootState) => state.jobsFiltered.filteredJobs
  );

  return (
    <>
      {
        filteredJobs && filteredJobs.length !== 0 ? <>
        <div className='md:grid flex flex-col grid-cols-3 ipad-portrait:grid-cols-1 w-full gap-[3vh] '>
          
          {filteredJobs?.map((job, key) => (
          <JobMatch
            key={key}
            jobId={job?.jobDetails?.id}
            companyName={job.companyName}
            date={job?.jobDetails?.datePosted}
            salary={job?.jobDetails?.salaryRange}
            title={job?.jobDetails?.title}
            location={job?.jobDetails?.location}
            jobDescription={job?.jobDetails?.description}
          />
        ))} </div></> : <p className='inter-tight text-[1.5vh] text-center w-full'>No jobs found! Reset the filters and try some other filters</p>
      }
    </>
  );
};

export default JobMatchesComponent;
