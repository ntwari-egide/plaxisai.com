import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Steps } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowRightCircleLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';

import {
  analyzeResume,
  careerMatchingAI,
  CareerMatchResponse,
  ResumeValidationResponse,
} from '@/features/gen-ai';
import { _RequestJobListing, jobListingRequest } from '@/features/job-listing';
import {
  ScanningProgress,
  setMatchesListing,
  setMatchingProfile,
  setResumeScanner,
} from '@/features/tracking-progress';
import { decryptData, encryptData } from '@/utils/encryptions';

const ScanningComponent = () => {
  const [resumeValidations, setResumeValidations] =
    useState<ResumeValidationResponse>();
  const [processStartTime, setProcessStartTime] = useState<number>(Date.now());
  const [estimatedEndTime, setEstimatedEndTime] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [warningsDisplayed, setWarningsDisplayed] = useState<boolean>(true);

  const router = useRouter();

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const scanningProgress = useSelector(
    (state: RootState) => state.trackingProgress
  );

  // Track process completion
  const isProcessComplete =
    scanningProgress.extractingData === ScanningProgress.COMPLETED &&
    scanningProgress.matchingProfile === ScanningProgress.COMPLETED &&
    scanningProgress.matchesListing === ScanningProgress.COMPLETED;

  // Update remaining time based on process progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (isProcessComplete) {
        setRemainingSeconds(0);
        clearInterval(timer);
      } else if (estimatedEndTime) {
        const remaining = Math.max(
          0,
          Math.ceil((estimatedEndTime - Date.now()) / 1000)
        );
        setRemainingSeconds(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedEndTime, isProcessComplete]);

  useEffect(() => {
    const perfromAIActions = async () => {
      const content = decryptData(Cookies.get('resume-content') || '');

      if (!content) {
        router.push('/');
        return;
      }

      const userResumeContent = JSON.parse(content);

      // Start process timing
      const startTime = Date.now();
      setProcessStartTime(startTime);
      // Set initial estimated completion time (30 seconds from start)
      setEstimatedEndTime(startTime + 30000);

      await dispatch(setResumeScanner(ScanningProgress.STARTED));

      const analysisResponse: ResumeValidationResponse = await dispatch(
        analyzeResume(userResumeContent)
      ).unwrap();

      setResumeValidations(analysisResponse);

      await dispatch(setResumeScanner(ScanningProgress.COMPLETED));

      await dispatch(setMatchingProfile(ScanningProgress.STARTED));

      const careerMatches: CareerMatchResponse = await dispatch(
        careerMatchingAI(userResumeContent)
      ).unwrap();

      //store career matches in the cookies
      Cookies.set(
        'career-matches',
        await encryptData(JSON.stringify(careerMatches))
      );

      await dispatch(setMatchingProfile(ScanningProgress.COMPLETED));

      await dispatch(setMatchesListing(ScanningProgress.STARTED));
      const companies: string[] = careerMatches.companyMatches.map(
        ({ name }) => name
      );

      const request: _RequestJobListing = {
        title: careerMatches.title,
        companies,
      };

      const response = await dispatch(jobListingRequest(request)).unwrap();

      //store job matches in the localStorage
      localStorage.setItem(
        'job-matches',
        await encryptData(JSON.stringify(response))
      );

      await dispatch(setMatchesListing(ScanningProgress.COMPLETED));
    };

    perfromAIActions();
  }, []);

  // Function to get status message
  const getStatusMessage = () => {
    if (isProcessComplete) {
      return 'All processes completed!';
    }
    if (remainingSeconds === null) {
      return 'Initializing...';
    }
    if (remainingSeconds === 0) {
      return 'Almost done...';
    }
    return `Hold tight, ${remainingSeconds} ${
      remainingSeconds === 1 ? 'sec' : 'secs'
    } remaining`;
  };

  if (!warningsDisplayed && remainingSeconds == 0 && resumeValidations) {
    router.push('/matches');
  }

  return (
    <div className='px-[3vw] h-[80vh] flex flex-col md:flex-row w-full'>
      <div className='flex flex-col items-center md:w-[65%]'>
        <div className='flex flex-col gap-[4vh] mt-[10vh]'>
          <h1 className='text-[7vh] whyteInktrap_font font-semibold'>
            {isProcessComplete ? 'Matching complete!' : 'Still scanning...'}
          </h1>
          <p className='inter-tight font-medium text-[1.7vh]'>
            We're doing the hard work for you—your job search just got a whole
            lot easier!
          </p>

          {warningsDisplayed ? (
            <div className={` items-center md:w-[65%] `}>
              <div className='border rounded-md p-[2vw] inter-tight flex flex-col gap-[2vh] text-[#F28729]'>
                <p className='text-[2vh] inter-tight font-semibold'>
                  Resume Scanning Warnings
                </p>

                <div className='flex flex-col gap-[1vh]'>
                  {resumeValidations?.error?.map((error, index) => (
                    <>
                      {' '}
                      {error.isValid ? (
                        ''
                      ) : (
                        <p
                          key={index}
                          className='text-[1.6vh] inter-tight font-normal'
                        >
                          In your{' '}
                          <span className=' font-medium'>{error.section}</span>,{' '}
                          {error.message}
                        </p>
                      )}
                    </>
                  ))}
                </div>

                <Button
                  onClick={() => setWarningsDisplayed(false)}
                  className='inter-tight bg-[white] rounded-full border-[#F28729] py-[2vh] border-[2px] font-semibold text-[#F28729] cursor-pointer text-[1.6vh] hover:scale-[1.02] md:w-[50%]'
                >
                  <RiArrowRightCircleLine className='text-[2vh]' />
                  Ignore warnings
                </Button>
              </div>
            </div>
          ) : (
            <p className='inter-tight font-semibold text-[1.7vh] italic'>
              {getStatusMessage()}
            </p>
          )}
        </div>
      </div>
      <div className='border-l border-l-[#DADADC] pt-[10vh] pl-[5vh] md:block hidden'>
        <Steps
          direction='vertical'
          current={
            scanningProgress.matchesListing === ScanningProgress.COMPLETED &&
            !warningsDisplayed
              ? 3
              : scanningProgress.matchingProfile ===
                  ScanningProgress.COMPLETED && !warningsDisplayed
              ? 2
              : 1
          }
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
