/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Image, Input } from 'antd';
import { useEffect, useRef } from 'react';
import { RiDownloadLine } from 'react-icons/ri';

import PlaxisAIMessage from './ai-message';
import UserMessage from './user-message';
import PlaxisAITag from '../job-details/ai-tag';
import AIDarkImg from '../../../public/images/ai-icon.png';
import { useRouter } from 'next/router';
import { decryptData } from '@/utils/encryptions';
import Cookies from 'js-cookie';
import { ResumeEnhancement, resumeEnhancementRequest, ResumeEnhancementsRequest } from '@/features/resume-enhancements';
import logger from '@/lib/logger';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

type ResumeEnhancementLayoutProps = {
  jobId: string | string[] | undefined;
}

const ResumeEnhancementLayout = ( { jobId }: ResumeEnhancementLayoutProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const resumeEnhancement: ResumeEnhancement = useSelector((state: RootState) => state.resumeEnhancement.resumeEnhanced);


  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to the bottom when the component mounts or updates (e.g., new messages)
  useEffect(() => {
    scrollToBottom();
  }, []);

  //getting all required data on the initial loading
  useEffect(() => {
    const getData = async () => {
      // Retrieve job matches from localStorage
      const rawData = await localStorage.getItem('job-matches');
      if (!rawData) {
        router.push('/');
        return;
      }

      try{
        // Decrypt and parse job matches
        const jobs = JSON.parse(decryptData(rawData));
        const matchingJob = jobs.find(
          (job: any) => job?.jobDetails?.id === jobId
        );

        // fetching resume content
        const content = decryptData(Cookies.get('resume-content') || '');


        const request: ResumeEnhancementsRequest = {
          resumeText: content,
          jobDescription: matchingJob?.jobDetails?.description
        }

        await dispatch( resumeEnhancementRequest(request));
      }
  
      catch(error) {
        //some consoles...
      }
  
    }

    getData();
  },[])

  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        <div className=' ipad-landscape:w-[60%] w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg h-[70vh] overflow-y-scroll' dangerouslySetInnerHTML={{ __html: resumeEnhancement.newResume}} />

        <div className='bg-[#F2F2F2] rounded-lg ipad-landscape:w-[40%] w-[35%] ipad-landscape:h-[60vh] md:h-[70vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />
          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[2vh]'>
            {/* matching results  */}
            <div className='flex flex-row gap-[0.4vw] items-center'>
              <div className=' bg-[#E5E5E5] w-[25px] flex flex-row h-[25px] items-center justify-center rounded-full'>
                <CheckCircleOutlined className='text-[1.5vh]' />
              </div>
              <h1 className='text-[1.7vh] font-medium'>Matching results</h1>
            </div>

            <div className='flex flex-row  justify-between'>
              <div className='flex flex-col gap-[1vh]'>
                
                {
                  resumeEnhancement && resumeEnhancement.results.matchingResults.map( (results, key) => (
                    <div key={key} className='flex flex-row items-center object-center gap-[1vw]'>
                  <CheckCircleFilled className='text-[#348888] rounded-full text-[2.5vh]' />
                  <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                    {results.criteria} ({results.number})
                  </p>
                </div>
                  ))
                }

                
              </div>

              <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
                {resumeEnhancement.results.matchingPercentage}
              </h1>
            </div>
          </div>

          <div
            className=' bg-white px-[4vh] py-[3vh] rounded-md flex flex-col gap-[3vh] h-[30vh] overflow-auto overflow-y-auto'
            ref={messagesEndRef}
          >
            <PlaxisAIMessage message='Sure! On it! Improved your experience section!' />

            <UserMessage message='Can you improve the description to pass the requirements' />

            <PlaxisAIMessage message='Sure! On it!' />
          </div>

          <div className='flex flex-row gap-[1vw] items-center'>
            <Image
              src={AIDarkImg.src}
              className='h-[20px] w-[20px]'
              preview={false}
            />

            <Input.TextArea
              className='border-none inter-tight placeholder:text-[#7E7E80] font-semibold text-[1.7vh] bg-[#F2F2F2]'
              placeholder='Ask me any thing ...'
            />

            <div className='border border-[#DBDBDB] w-[35px] h-[35px] rounded-md flex items-center object-center justify-center flex-row cursor-pointer hover:scale-[1.02] transition-all'>
              <SendOutlined className=' -rotate-45 text-[1.6vh]' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center object-center'>
        <div className='md:w-[28vw] ipad-landscape:w-[40vw]'>
          {/* actions  */}

          <div className='flex flex-row justify-between mt-[2vh] w-full'>
            <Button className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'>
              <RiDownloadLine className='text-[2vh]' />
              Download PDF
            </Button>

            <Button className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'>
              <RiDownloadLine className='text-[2vh]' />
              Download Word (.Docx)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancementLayout;
