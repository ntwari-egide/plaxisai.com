import { Slider } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import ReusableSelect from '../controls/select';
import JobCard from '../layouts/job-card';
import { getFilterOptions } from '@/utils/filters';
import data from './data';

type ResponseLayoutProps = {
  onClick?: () => void;
};

const ResponseLayout = ({ onClick }: ResponseLayoutProps) => {
  const router = useRouter();

  let allJobs = [];
  allJobs = useSelector((state: RootState) => state.jobListing.jobs);

  const matchedCompanies = useSelector(
    (state: RootState) => state.openAI.response?.companyMatches
  );

  // if the all jobs we need to send back to index.tsx

  useEffect(() => {
    if (allJobs.length === 0) {
      router.push('/');
    }
  }, [allJobs, router]);

  console.log( 'filtering options: ', getFilterOptions(data, 'datePosted'));
  

  return (
    <div className='relative min-h-screen p-[2vw]' onClick={onClick}>
      <div className=' relative flex flex-row'>
        <h1 className='text-white text-[3vh]'>Matched</h1>
      </div>
      <div className='flex flex-col-reverse md:flex-row gap-[3vw] mt-[3vh]'>
        <div className='bg-[#09090D] sticky top-[5vh] md:w-[20%] border-[1px] border-[#1C1C1F] h-[77vh] rounded-md'>
          <LeftComponent
            allJobs={allJobs}
            matchedCompanies={matchedCompanies}
          />
        </div>
        <div className='md:w-[80%] min-h-[60vh] flex flex-col gap-[4vh]'>
          <div className='grassmorphism_bg sticky top-[0] border-[1px] border-[#1C1C1F] z-50 min-h-[8vh] rounded-md'>
            <ResponseFilterComponent />
          </div>
          <div className='gap-[2vh] grid grid-cols-1  md:grid-cols-2'>
            {/* {data.map((job) => ( */}
            {allJobs.map((job) =>
              job.jobs.jobs.map((foundJob: any, index: number) => (
                <JobCard
                  key={index}
                  company={foundJob.company}
                  position={foundJob.title}
                  duration={foundJob.employmentType}
                  location={foundJob.location}
                  description={foundJob.description}
                  link={foundJob.jobProviders[0].url}
                  salary={foundJob.salaryRange}
                  postedDate={foundJob.datePosted}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResponseFilterComponent = () => {
  const companyTypeOptions = [
    { label: 'Company type', value: 'Company type' },
    { label: 'All', value: 'All' },
    { label: 'Tech', value: 'Tech' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Health', value: 'Health' },
    { label: 'Retail', value: 'Retail' },
  ];

  const compensationOptions = [
    { label: '> 50k', value: '> 50k' },
    { label: '> 100k', value: '> 100k' },
    { label: '> 150k', value: '> 150k' },
    { label: '> 200k', value: '> 200k' },
    { label: '> 250k', value: '> 250k' },
  ];

  const levelOptions = [
    { label: 'Level', value: 'Level' },
    { label: 'Entry', value: 'Entry' },
    { label: 'Mid', value: 'Mid' },
    { label: 'Senior', value: 'Senior' },
  ];

  const locationOptions = [
    { label: 'Location', value: 'Location' },
    { label: 'Remote', value: 'Remote' },
    { label: 'New York', value: 'New York' },
    { label: 'California', value: 'California' },
    { label: 'Texas', value: 'Texas' },
    { label: 'Florida', value: 'Florida' },
  ];

  return (
    <div className='flex flex-col p-[1vh]'>
      <div className='flex  flex-col md:flex-row  p-[1vh] gap-[4vw] justify-between'>
        <h1 className='text-[2vh] text-white alliance-2'>Filters:</h1>
        <div className='md:flex gap-[2vw] md:gap-0 grid-cols-2 grid flex-row justify-between w-full'>
          <ReusableSelect
            defaultValue='Company type'
            options={companyTypeOptions}
            placeholder='Company Type'
            width={150}
          />

          <ReusableSelect
            defaultValue='Compensation'
            options={compensationOptions}
            placeholder='Compensation'
            width={150}
          />

          <ReusableSelect
            defaultValue='Level'
            options={levelOptions}
            placeholder='Level'
            width={150}
          />

          <ReusableSelect
            defaultValue='Location'
            options={locationOptions}
            placeholder='Location'
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

interface LeftComponentProps {
  allJobs?: any[];
  matchedCompanies?: any[];
}

const LeftComponent = ({ allJobs, matchedCompanies }: LeftComponentProps) => {
  const totalJobs =
    allJobs && Array.isArray(allJobs)
      ? allJobs
          .map((job: any) => job.jobs.jobs.length)
          .reduce((a: number, b: number) => a + b, 0)
      : 0;

  return (
    <div className='flex flex-col gap-[2vh]'>
      <div className='w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]'>
        <h1 className='text-[#9D9D9E] alliance-2 text-[1.7vh]'>
          Matching Companies
        </h1>
        <div className='h-16 w-20 rounded-full border-[2px] border-[#00AC3A] flex place-items-center'>
          <h1 className='text-white text-center w-full text-[3vh]'>
            {allJobs?.length}
          </h1>
        </div>
      </div>
      <div className='w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]'>
        <h1 className='text-[#9D9D9E] alliance-2 text-[1.7vh]'>
          Resume Matched Jobs
        </h1>
        <div className='h-16 w-16 rounded-full border-[2px] border-[#F28729] flex place-items-center'>
          <h1 className='text-white text-center w-full text-[3vh]'>
            {totalJobs}
          </h1>
        </div>
      </div>
      <div className='w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]'>
        <h1 className='text-[#9D9D9E] alliance-2 text-[1.7vh]'>
          Matched Companies Score (10)
          <table className='mt-[2vh]'>
            {matchedCompanies?.map((company: any, index: number) => (
              <tbody key={index}>
                <tr>
                  <td className='text-[white] text-[1.7vh]'>
                    {company.name} :
                  </td>
                  <td className='text-[#9D9D9E] text-[1.7vh]'>
                    {company.matchingCredit}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </h1>
      </div>
      <div className='w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh]'>
        <h1 className='text-[#9D9D9E] alliance-2 text-[1.7vh]'>
          Experience Score
        </h1>
        <span className='text-[#00AC3A] text-[2.3vh]'>80</span>
        <Slider defaultValue={80} disabled />
      </div>
    </div>
  );
};

export default ResponseLayout;
