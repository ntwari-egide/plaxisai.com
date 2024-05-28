/* eslint-disable react-hooks/exhaustive-deps */
import { Slider } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import { getFilterOptions } from '@/utils/filters';

import ReusableSelect from '../controls/select';
import JobCard from '../layouts/job-card';

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
            <ResponseFilterComponent allJobs={allJobs} />
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

interface ResponseFilterComponentProps {
  allJobs: any[];
}

const ResponseFilterComponent = ({ allJobs } : ResponseFilterComponentProps) => {

  return (
    <div className='flex flex-col p-[1vh]'>
      <div className='flex  flex-col md:flex-row  p-[1vh] gap-[4vw] justify-between'>
        <h1 className='text-[2vh] text-white alliance-2'>Filters:</h1>
        <div className='md:flex gap-[2vw] md:gap-0 grid-cols-2 grid flex-row justify-between w-full'>
          <ReusableSelect
            defaultValue='Company'
            options={allJobs && getFilterOptions(allJobs, 'company')}
            placeholder='Company'
            width={150}
            allowMultiple
          />

          <ReusableSelect
            defaultValue='Job Provider'
            options={allJobs && getFilterOptions(allJobs, 'jobProvider')}
            placeholder='Job Provider'
            width={150}
            allowMultiple
          />

          <ReusableSelect
            defaultValue='Employment Type'
            options={allJobs && getFilterOptions(allJobs, 'employmentType')}
            placeholder='Employment Type'
            width={150}
            allowMultiple
          />

          <ReusableSelect
            defaultValue='Location'
            options={allJobs && getFilterOptions(allJobs, 'location')}
            placeholder='Location'
            width={150}
            allowMultiple
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
