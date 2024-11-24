/* eslint-disable react-hooks/rules-of-hooks */
import { CheckCircleFilled } from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { RootState } from '@/store';

import { GraderRequest, jobGraderRequest } from '@/features/job-grader';
import { decryptData } from '@/utils/encryptions';

type JobMatchProps = {
  date?: string;
  companyName?: string;
  title?: string;
  salary?: string;
  location?: string;
  jobDescription: string;
  jobId: string;
};

const JobMatch = ({
  date,
  companyName,
  title,
  salary,
  location,
  jobDescription,
  jobId,
}: JobMatchProps) => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const [graderResponse, setGraderResponse] = useState<any>();

  const router = useRouter();

  const content = decryptData(Cookies.get('resume-content') || '');

  if (!content) {
    router.push('/');
    return;
  }

  const userResumeContent = JSON.parse(content);

  useEffect(() => {
    // send the request to scan through the resume description

    const getJobAIGradings = async () => {
      const request: GraderRequest = {
        resumeText: userResumeContent,
        jobDescription,
      };

      const graderResponse = await dispatch(jobGraderRequest(request));

      setGraderResponse(graderResponse.payload);
    };

    getJobAIGradings();
  }, []);

  return (
    <Link href={`/job-details/${jobId}`} target='_blank'>
      <div className='border py-[2vh] rounded-xl px-[1vw] border-[#E6E6E7] w-full flex flex-col'>
        <div className='bg-[#EBF3F3] rounded-md flex flex-col py-[2vh] px-[1vw] gap-[2vh]'>
          <div className='flex flex-row justify-between'>
            {date ? (
              <p className='bg-white px-[1.5vw] py-[1vh] flex items-center inter-tight text-[1.7vh] font-medium rounded-full'>
                {date}
              </p>
            ) : (
              ''
            )}
            <p className='whyteInktrap_font text-[3.5vh] font-semibold'>
              {graderResponse?.matchingPercentage}
            </p>
          </div>

          <div className='flex flex-col gap-[1vh]'>
            <div className='flex justify-between flex-row'>
              <h1 className='inter-tight text-[1.7vh] font-semibold'>
                {companyName}
              </h1>

              <h1 className='inter-tight text-[1.7vh]'>{location}</h1>
            </div>
            <h1 className='whyteInktrap_font text-[2vh] font-medium'>
              {title}
            </h1>
          </div>

          <div className='flex flex-col gap-[1vh]'>
            {!graderResponse ? (
              <>
                <Skeleton active className='w-full' />
              </>
            ) : (
              <>
                {graderResponse &&
                  graderResponse.matchingResults.map((result: any) => {
                    // Extract and convert the percentage value
                    const resultNumber = parseFloat(
                      result.number.replace('%', '')
                    );

                    return (
                      <div
                        key={result.criteria}
                        className='flex flex-col gap-[2vh]'
                      >
                        <div className='flex flex-row items-center object-center gap-[1vw]'>
                          <CheckCircleFilled
                            className={`${
                              resultNumber > 95
                                ? 'text-[#173440]'
                                : resultNumber > 85
                                ? 'text-[#348888]'
                                : 'text-[#AAE2E2]'
                            } rounded-full text-[3vh]`}
                          />
                          <p className='text-[2vh] inter-tight text-[#09090D]'>
                            {result.criteria} ({result.number})
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>

        <div className='flex flex-row justify-between mt-[2vh] w-full'>
          <Button className='inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[3vh] hover:text-[#09090D] font-semibold text-[#09090D] cursor-pointer text-[2vh] hover:scale-[1.02] w-[60%]'>
            Easy Apply
            <RiArrowRightLine className='text-[3vh]' />
          </Button>
          {salary ? (
            <div className='border-[#E6E6E7] border rounded-full px-[2vw] flex items-center text-[1.3vh]  text-center inter-tight font-medium'>
              {salary}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobMatch;
