import { analyzeResume, careerMatchingAI, CareerMatchResponse, ResumeValidationResponse } from '@/features/gen-ai';
import { _RequestJobListing, jobListingRequest } from '@/features/job-listing';
import logger from '@/lib/logger';
import { RootState } from '@/store';
import { decryptData } from '@/utils/encryptions';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Steps } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ScanningComponent = () => {

  const [resumeValidations, setResumeValidations] = useState<ResumeValidationResponse>()

  const [careerMatches, setCareerMatches] = useState<CareerMatchResponse>()

  const router = useRouter()

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  useEffect( () => {

    const perfromAIActions = async () => {
      const content =  decryptData(Cookies.get('resume-content') || '')

    // if userResumeContent does not exists, send back to the main page
    if(!content) {
      router.push("/");
      return;
    }

    const userResumeContent = JSON.parse(
     content
    );

    // send resume content to the validate resume api

     // getting the company matches using open ai api
    //  await dispatch(seta('STARTED'));
     const analysisResponse : ResumeValidationResponse = await dispatch(
       analyzeResume(userResumeContent)
     ).unwrap();
    //  await dispatch(setOpenAi('COMPLETED'));
     setResumeValidations(analysisResponse);
    
    // send the resume content to the career matches suggestion
    const careerMatches: CareerMatchResponse = await dispatch(
      careerMatchingAI(userResumeContent)
    ).unwrap();

    setCareerMatches(careerMatches);
    
    // send the response of career suggests to the job maches 
    const companies: string[] = careerMatches.companyMatches.map(({ name }) => name);
    
    const request: _RequestJobListing = {
      title: careerMatches.title,
      companies,
    }

    const jobsFound: CareerMatchResponse = await dispatch(
      jobListingRequest(request)
    ).unwrap();

  }

    perfromAIActions();
  },[])

  return (
    <div className='px-[3vw] h-[80vh] flex flex-col md:flex-row w-full'>
      <div className='flex flex-col items-center md:w-[65%]'>
        <div className=' flex flex-col gap-[4vh] mt-[10vh]'>
          <h1 className='text-[7vh] whyteInktrap_font font-semibold'>
            Still scanning...
          </h1>
          <p className='inter-tight  font-medium text-[1.7vh]'>
            We’re doing the hard work for you—your job search just got a whole
            lot easier!
          </p>
          <p className='inter-tight  font-semibold text-[1.7vh] italic'>
            Hold tight, 30 secs
          </p>
        </div>
      </div>
      <div className='border-l border-l-[#DADADC] pt-[10vh] pl-[5vh] md:block hidden'>
        <Steps
          direction='vertical'
          current={1}
          className='alliance-2'
          items={[
            {
              title: 'Extracting Data',
              description:
                'Your resume is meticulously analyzed by our cutting-edge algorithm, ensuring no detail is missed.',
            },
            {
              title: 'Matching Profiles',
              description:
                'Our intelligent system scans over 5 million employers, pinpointing the perfect match for you in mere seconds.',
            },
            {
              title: 'Revealing Best Matches, Referrals & Enhancements',
              description:
                'Instantly access a curated list of top-matching companies and positions.',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ScanningComponent;
