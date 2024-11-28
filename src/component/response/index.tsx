/* eslint-disable react-hooks/exhaustive-deps */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import { CareerMatchResponse } from '@/features/gen-ai';

import FiltersComponent from './filter';
import JobMatchesComponent from './job-matches-component';
import CompaniesMatch from '../matches/companies';
import TagComponent from '../reusable/tags';

type ResponseLayoutProps = {
  onClick?: () => void;
};

const ResponseLayout = ({ onClick }: ResponseLayoutProps) => {
  const router = useRouter();

  const [careerMatches, setCareerMatches] = useState<CareerMatchResponse>();

  const matches = useSelector((state: RootState) => state.genAI.companyMatches);

  const jobMatches = useSelector((state: RootState) => state.jobListing.jobs);

  useEffect(() => {
    const getAllData = async () => {
      if (!matches) {
        router.push('/');
      } else {
        setCareerMatches(matches);
      }
    };

    getAllData();
  }, []);

  const filteredJobs = useSelector(
    (state: RootState) => state.jobsFiltered.filteredJobs
  );

  return (
    <div
      className='md:px-[3vw] px-[6vw] mt-[3vh] relative flex flex-col  gap-[2vh]'
      onClick={onClick}
    >
      <div className='md:flex hidden ipad-portrait:flex-col flex-row gap-[3vw] items-center'>
        <TagComponent
          title='Matching Results'
          description='3 companies found'
          classname='bg-[#348888]'
        />
        <TagComponent
          title='Visa Sponsorship'
          description='3 matches sponsor visa'
          classname='bg-[#09090D]'
        />
        {/* <TagComponent
          title='Hires from Lehigh'
          description='10+ employees from Lehigh University'
          classname='bg-[#173440]'
        /> */}
      </div>
      <div className='md:grid ipad-portrait:grid-cols-2 grid-cols-3 gap-[3vw]'>
        {careerMatches?.companyMatches.map((company, key) => (
          <Link href='#jobs' key={key}>
            <CompaniesMatch
              title={careerMatches.title}
              companyName={company.name}
              companyDomain={company.companyDomain}
              matchingDetails={company.matchingDetails}
              subtitle='20 jobs available from this company'
              matchingNumber={company.matchingCredit.toString()}
              logoImg='https://logodownload.org/wp-content/uploads/2013/12/apple-logo-16.png'
            />
          </Link>
        ))}
      </div>

      <div className='mt-[5vh]' id='jobs'>
        <div className='flex flex-row justify-between'>
          <h1 className='whyteInktrap_font text-[2.6vh] md:text-[4.5vh] font-semibold'>
            All matched jobs
          </h1>
          <div className='md:block hidden'>
            <TagComponent
              title='Matching Results'
              description={`${filteredJobs.length} jobs found`}
              classname='bg-[#348888]'
            />
          </div>
        </div>
      </div>

      <div className='sticky top-0 z-10'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-[15%] ipad-portrait:w-[35vw] hidden md:block'>
            <FiltersComponent allJobs={jobMatches} />
          </div>
          <div className='md:w-[85%]'>
            <JobMatchesComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseLayout;
