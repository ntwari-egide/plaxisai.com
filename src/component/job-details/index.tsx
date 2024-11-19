/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { CheckCircleFilled } from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Image, Select, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  RiArrowRightLine,
  RiGroupLine,
  RiMapPinLine,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { RootState } from '@/store';

import { CareerMatchResponse } from '@/features/gen-ai';
import { GraderRequest, jobGraderRequest } from '@/features/job-grader';
import { decryptData } from '@/utils/encryptions';

import PlaxisAITag from './ai-tag';
import AIDarkImg from '../../../public/images/ai-icon.png';
import AILightImg from '../../../public/images/ai-icon-white.png';

type JobDetailsLayoutProps = {
  jobId: string | string[] | undefined;
};

const JobDetailsLayout = ({ jobId }: JobDetailsLayoutProps) => {
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [graderResponse, setGraderResponse] = useState<any>(null);
  const [companyDomain, setCompanyDomain] = useState<string>();
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // Retrieve job matches from localStorage
      const rawData = await localStorage.getItem('job-matches');
      if (!rawData) {
        router.push('/');
        return;
      }

      try {
        // Decrypt and parse job matches
        const jobs = JSON.parse(decryptData(rawData));
        const matchingJob = jobs.find(
          (job: any) => job?.jobDetails?.id === jobId
        );

        // if (!matchingJob) {
        //   router.push('/'); // Redirect if no matching job is found
        //   return;
        // }

        setJobDetails(matchingJob); // Set the matching job details
      } catch (error) {
        console.error('Error parsing job data:', error);
        router.push('/'); // Redirect in case of an error
      }

      // fetching company domain
      const storedMatches = Cookies.get('career-matches');

      if (!storedMatches) {
        console.error('No career matches found in cookies.');
        return; // Exit early if no data is present
      }

      try {
        const decryptedData = decryptData(storedMatches);

        if (!decryptedData) {
          console.error('Decryption returned null or invalid data.');
          return; // Exit early if decryption fails
        }

        const careerMatches: CareerMatchResponse = JSON.parse(decryptedData);

        careerMatches.companyMatches.forEach((company) => {
          if (company.name === jobDetails?.companyName) {
            setCompanyDomain(company.companyDomain);
          }
        });
      } catch (error) {
        // console.error("Failed to parse career matches or decrypt data:", error);
      }
    };

    getData();
  }, [router, jobId, companyDomain, jobDetails?.companyName]); // Only runs when router or jobId changes

  useEffect(() => {
    // Fetch grader response only when jobDetails is available
    const fetchGraderResponse = async () => {
      if (!jobDetails) return;

      try {
        // Retrieve and decrypt resume content
        const content = decryptData(Cookies.get('resume-content') || '');
        if (!content) {
          router.push('/');
          return;
        }

        const userResumeContent = JSON.parse(content);

        // Create the grading request
        const request: GraderRequest = {
          resumeText: userResumeContent,
          jobDescription: jobDetails.jobDetails.description,
        };

        // Dispatch the grading request and set the response
        const graderResponse = await dispatch(jobGraderRequest(request));
        setGraderResponse(graderResponse.payload);
      } catch (error) {
        console.error('Error fetching grader response:', error);
      }
    };

    fetchGraderResponse();
  }, [jobDetails, dispatch, router]); // Runs when jobDetails changes

  return (
    <div className='md:px-[3vw] px-[6vw] mt-[4vh]'>
      <div className='flex ipad-portrait:flex-col-reverse flex-col-reverse md:flex-row md:gap-[4vw] gap-[14vw]'>
        <div className='md:w-[65%] ipad-portrait:w-full flex flex-col gap-[3vh]'>
          {/* job details */}

          <div className='flex flex-row justify-between'>
            <h1 className='md:text-[4.5vh] text-[2.5vh] font-semibold whyteInktrap_font'>
              {jobDetails?.jobDetails?.title}
            </h1>
            { jobDetails && <Link className='md:w-[15%] ipad-landscape:w-[16vw]' target='_blank' href={jobDetails?.jobDetails?.jobProviders[0]?.url} >
              <Button className='inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[2.3vh] hover:text-[#09090D] font-semibold text-[#09090D] cursor-pointer text-[1.4vh] hover:scale-[1.02] '>
                Easy Apply
                <RiArrowRightLine className='text-[3vh] -rotate-45' />
              </Button>
            </Link>}
          </div>

          <div className='flex flex-row'>
            <div className='flex flex-row gap-[1.5vw]'>
              <Image
                src={`https://logo.clearbit.com/${companyDomain}`}
                className='w-[60px] h-[60px] object-contain '
                preview={false}
              />
              <div className='flex flex-col justify-between'>
                <div className='flex flex-row gap-[1vw]'>
                  <div className='flex flex-row items-center gap-[0.4vw]'>
                    <h1 className='text-[#09090D] font-semibold text-[1.6vh]'>
                      {jobDetails?.companyName}
                    </h1>
                    <RiVerifiedBadgeFill className='text-[#F28729]' />
                  </div>
                  {jobDetails?.jobDetails?.location && (
                    <div className='flex flex-row gap-[0.4vw] cursor-pointer hover:underline'>
                      <RiMapPinLine className='text-[#848486] text-[1.7vh]' />
                      <h1 className='text-[#848486] font-semibold text-[1.6vh]'>
                        {jobDetails?.jobDetails?.location}
                      </h1>
                    </div>
                  )}
                </div>

                <div className='flex flex-row gap-[1vw]'>
                  <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                    Full-time
                  </h1>
                  {jobDetails?.jobDetails?.employmentType && (
                    <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                      {jobDetails?.jobDetails?.employmentType}
                    </h1>
                  )}
                  <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                    Onsite
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[2vh]'>
            <h1 className='text-[1.8vh] text-[#173440] font-semibold inter-tight'>
              Job Description
            </h1>
            <div
              className='inter-tight whitespace-break-spaces text-[#848486] text-[1.8vh] leading-[3vh]'
              dangerouslySetInnerHTML={{
                __html: jobDetails?.jobDetails?.description,
              }}
            ></div>
          </div>
        </div>

        <div className='bg-[#F2F2F2] rounded-lg ipad-portrait:w-full md:w-[35%] md:h-[78vh] ipad-portrait:relative md:sticky ipad-portrait:top-0 top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />
          <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
            {graderResponse?.matchingPercentage}
          </h1>
          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[2vh]'>
            {/* matching results  */}

            {!graderResponse ? (
              <>
                <Skeleton active className='w-full' />
              </>
            ) : (
              <>
                {graderResponse &&
                  graderResponse.matchingResults.map((result: any) => (
                    <div
                      key={result.criteria}
                      className='flex flex-col gap-[1vh]'
                    >
                      <div className='flex flex-row items-center object-center gap-[1vw]'>
                        <CheckCircleFilled
                          className={`${
                            result.number > 95
                              ? 'text-[#173440]'
                              : result.number > 90
                              ? 'text-[#348888]'
                              : 'text-[#AAE2E2]'
                          } rounded-full text-[2.5vh]`}
                        />
                        <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                          {result.criteria} ({result.number})
                        </p>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>

          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[3vh]'>
            {/* people  */}
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row gap-[0.4vw] items-center'>
                <div className=' bg-[#E5E5E5] w-[45px] hidden md:flex flex-row h-[45px] items-center justify-center rounded-full'>
                  <RiGroupLine className='text-[1.5vh]' />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-[1.7vh] font-medium'>People</h1>
                  <h1 className='text-[1.7vh] font-normal text-[#808080]'>
                    Attended Lehigh
                  </h1>
                </div>
              </div>

              <Select
                className=' bg-white text-black'
                defaultValue={'Recruiting Team'}
                options={[
                  { label: 'Recruiting Team', value: 'Recruiting Team' },
                  { label: 'Dev Team', value: 'Dev Team' },
                  { label: 'Marketing Team', value: 'Marketing Team' },
                ]}
              />
            </div>

            <div className='flex flex-row justify-between ipad-portrait:justify-start ipad-portrait:gap-[3vw]'>
              <Image
                src='https://images.pexels.com/photos/28570314/pexels-photo-28570314/free-photo-of-confident-young-woman-in-glasses-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/28927046/pexels-photo-28927046/free-photo-of-nigerian-woman-posing-with-books-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />
            </div>
          </div>

          <div>
            {/* actions  */}

            <div className='flex flex-col md:gap-0 gap-[2vh] md:flex-row justify-between mt-[2vh] w-full'>
              <Link
                href={'/resume-enhancements'}
                target='_blank'
                className='md:w-[40%] w-full ipad-landscape:w-[43%]'
              >
                <Button className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer ipad-landscape:text-[1.4vh] text-[1.6vh] hover:scale-[1.02] w-full'>
                  <Image
                    src={AILightImg.src}
                    className='h-[15px] w-[15px]'
                    preview={false}
                  />
                  Enhance resume
                </Button>
              </Link>

              <Link
                href={'/cover-letter-enhancements'}
                target='_blank'
                className='md:w-[55%] w-full'
              >
                <Button className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02]  ipad-landscape:text-[1.4vh] w-full'>
                  <Image
                    src={AIDarkImg.src}
                    className='h-[15px] w-[15px]'
                    preview={false}
                  />
                  Generate Cover Letter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[10vh]'>
        {/* simalr jobs  */}
        <h1 className='text-[4.5vh] font-semibold whyteInktrap_font'>
          Similar Jobs
        </h1>

        {/* <div className='md:grid flex flex-col ipad-portrait:grid-cols-2 ipad-landscape:grid-cols-3 md:grid-cols-4 w-full gap-[3vh] '>
          {jobMatches?.map((job, key) => (
            <>
              {key < 4 ? (
                <JobMatch
                  key={key}
                  companyName={job.companyName}
                  date={job.date}
                  salary={job.salary}
                  title={job.title}
                  jobDescription=''
                />
              ) : (
                ''
              )}
            </>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default JobDetailsLayout;
