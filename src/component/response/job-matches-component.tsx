import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import JobMatch from '../matches/job';


const JobMatchesComponent = ( ) => {

  const jobMatches = useSelector(
    (state: RootState) => state.jobListing.jobs 
  )

  return (
    <div className='md:grid flex flex-col grid-cols-3 ipad-portrait:grid-cols-1 w-full gap-[3vh] '>
      {jobMatches?.map((job, key) => (
        <JobMatch
          key={key}
          companyName={job.companyName}
          date={job?.jobDetails?.datePosted}
          salary={job?.jobDetails?.salaryRange
          }
          title={job?.jobDetails?.title}
          location={job?.jobDetails?.location}
          jobDescription={job?.jobDetails?.description}
        />
      ))}
    </div>
  );
};

export default JobMatchesComponent;
