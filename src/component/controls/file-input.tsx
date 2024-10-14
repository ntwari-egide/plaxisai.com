/* eslint-disable unused-imports/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Flex, message, Modal, Progress, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';

import { jobListingRequest } from '@/features/job-listing';
import { analyzeResume } from '@/features/open-ai';
import { uploadFile } from '@/features/resume-scanner';
import {
  setJobListing,
  setOpenAi,
  setResumeScanner,
} from '@/features/tracking-progress';

import TextButton from './text-button';
import TypingAnimation from '../reusable/typing-animations';
import AIIcon from '../../../public/images/ai-icon.png';

type ReusableFileInputProps = {
  onChange?: (file: File) => void;
  accept?: string;
  className?: string;
  placeholder?: string;
  buttonContent?: string;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
};

const ReusableFileInput = ({
  accept,
  className,
  style,
  buttonContent,
}: ReusableFileInputProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const Router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRedirected, setIsRedirected] = useState(false);

  const [openResultsModel, setOpenResultsModel] = useState(false);

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const { error, response } = useSelector(
    (state: RootState) => state.resumeScanner
  );
  const progress = useSelector((state: RootState) => state.trackingProgress);
  const validity = useSelector(
    (state: RootState) => state.openAI.response?.validity
  );

  const getBase64 = (img: File, callback: (imageUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setOpenResultsModel(true); // make the progress bar visible
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await dispatch(setResumeScanner('STARTED'));
      const resumeText = await dispatch(uploadFile(formData)).unwrap();
      await dispatch(setResumeScanner('COMPLETED'));

      // getting the company matches using open ai api
      await dispatch(setOpenAi('STARTED'));
      const companyMatches = await dispatch(
        analyzeResume(resumeText.content)
      ).unwrap();
      await dispatch(setOpenAi('COMPLETED'));

      // get company matches from the response
      await dispatch(setJobListing('STARTED'));
      await dispatch(jobListingRequest(companyMatches));
      await dispatch(setJobListing('COMPLETED'));
      
      // // send the route to the /response and open in new tab
      // if (validity && validity?.isValid) {
      //   Router.push('/response');  
      // } else {
      //   message.error('Invalid resume');
      // }

      // Get this url from response in real world.
      getBase64(file, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    } catch (error) {
      message.error('Error processing the file');
      setLoading(false);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <>
      <Flex
        className={`flex relative flex-col md:gap-[1vh] inter-tight ${className}`}
        style={style}
        onClick={handleContainerClick}
      >
        <div className='flex cursor-pointer hover:scale-[1.03] transition-all flex-row justify-between items-center place-items-center bg-[#DADADC] text-[#CDCDD0]  px-[1vw] py-[1vh] gap-[2vw] rounded-full text-[2vh] hover:border-[1px] hover:border-[#348888]'>
          <Image
            src={AIIcon}
            className='ml-[0.5vw]'
            alt='AI Icon'
            width={20}
            height={20}
          />

          <p className='md:w-[14vw] w-[60vw] ipad-portrait:w-[40vw] text-[#333336] ipad-landscape:w-[30vw] font-medium'>
            <TypingAnimation
              strings={[
                'Upload your resume here',
                'Get matched',
                'Get hired!',
                'Just one upload away!',
              ]}
              typeSpeed={50}
              backSpeed={10}
              startDelay={0}
              backDelay={2000}
              loop={false}
              showCursor={true}
              cursorChar='|'
              smartBackspace={true}
              shuffle={false}
            />
          </p>
          <TextButton className='font-semibold' text={buttonContent} />
          <input
            ref={fileInputRef}
            type='file'
            accept={accept}
            className='hidden'
            onChange={handleChange}
          />
        </div>
      </Flex>

      {/* Response Layout Modal component */}

      <Modal
        open={openResultsModel}
        className='w-[60vw] relative'
        onCancel={() => setOpenResultsModel(false)}
        footer={null}
      >
        {
          validity && !validity?.isValid ? <div>
            
            <div className=' h-[60vh] text-[#000000]'>
              {
                validity?.errors.map((error, index) => (
                  <>
                  <p key={index} className='text-[1.5vh]'>{error.section}</p>
                  <p key={index} className='text-[1.5vh]'>{error.message}</p>
                  </>
                ))
              }
            </div>
            
          </div> : <div>
            <div className='w-full flex justify-center py-[5vh]'>
          <div>
            <div className='flex justify-center'>
              <Spin
                className='text-[#348687]'
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 130, color: '#348687' }}
                    spin
                  />
                }
              />
            </div>
            <div className='flex flex-col mt-[4vh] gap-[2vw] w-[40vw]'>
              <div className='flex flex-row gap-[1vw]'>
                <Progress
                  percent={
                    progress.resumeScaner === 'STARTED'
                      ? 40
                      : progress.resumeScaner === 'COMPLETED'
                      ? 100
                      : 0
                  }
                  size='small'
                  status={
                    progress.resumeScaner === 'COMPLETED' ? 'success' : 'active'
                  }
                />
                <h1 className='text-[#000000] text-[2vh] w-1/2'>
                  {progress.resumeScaner === 'STARTED'
                    ? 'Extracting Data'
                    : 'Data Extracted'}
                </h1>
              </div>

              <div className='flex flex-row gap-[1vw]'>
                <Progress
                  percent={
                    progress.resumeScaner === 'STARTED'
                      ? 40
                      : progress.resumeScaner === 'COMPLETED'
                      ? 100
                      : 0
                  }
                  size='small'
                  status={
                    progress.resumeScaner === 'COMPLETED' ? 'success' : 'active'
                  }
                />
                <h1 className='text-[#000000] text-[2vh] w-1/2'>
                  {progress.resumeScaner === 'STARTED'
                    ? 'Extracting Data'
                    : 'Data Extracted'}
                </h1>
              </div>

              <div className='flex flex-row gap-[1vw]'>
                <Progress
                  percent={
                    progress.jobListing === 'STARTED'
                      ? 50
                      : progress.jobListing === 'COMPLETED'
                      ? 100
                      : 0
                  }
                  size='small'
                  status={
                    progress.jobListing === 'COMPLETED' ? 'success' : 'active'
                  }
                />
                <h1 className='text-[#000000] text-[2vh] w-1/2'>
                  {progress.jobListing === 'STARTED'
                    ? 'Matching Job Listings'
                    : 'Listings Matched'}
                </h1>
              </div>
            </div>
          </div>
        </div>
          </div>
        }
      </Modal>
    </>
  );
};

export default ReusableFileInput;
