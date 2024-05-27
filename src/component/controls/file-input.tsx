import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Flex, Modal, Progress, Steps, Upload, UploadProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetProps, useDispatch, useSelector } from 'react-redux';

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
import AIIcon from '../../../public/images/ai-icon.png';

type ReusableFileInput = {
  onChange?: (file: File) => void;
  accept?: string;
  className?: string;
  placeholder?: string;
  buttonContent?: string;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
};

type FileType = Parameters<GetProps<UploadProps['beforeUpload']>>[0]['file'];

// it first of all need to upload the file somewhere.

const ReusableFileInput = ({
  onChange,
  accept,
  className,
  style,
  placeholder,
  buttonContent,
}: ReusableFileInput) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const Router = useRouter();

  const [openResultsModel, setOpenResultsModel] = useState(false);

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const { error, response } = useSelector(
    (state: RootState) => state.resumeScanner
  );

  const progress = useSelector((state: RootState) => state.trackingProgress);

  const getBase64 = (img: FileType, callback: (imageUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = async (info) => {
    setOpenResultsModel(true); // make the progress bar visible

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // send the file to the server api for processing
      const formData = new FormData();
      formData.append('file', info.file.originFileObj as File);
      dispatch(setResumeScanner('STARTED'));
      const resumeText = await dispatch(uploadFile(formData)).unwrap();
      dispatch(setResumeScanner('COMPLETED'));

      // getting the company matches using open ai api
      dispatch(setOpenAi('STARTED'));
      const companyMatches = await dispatch(analyzeResume(resumeText.content)).unwrap();
      dispatch(setOpenAi('COMPLETED'));

      // get company matches from the response
      dispatch(setJobListing('STARTED'));
      await dispatch(jobListingRequest(companyMatches));
      dispatch(setJobListing('COMPLETED'));

      // send the route to the /response and open in new tab
      Router.push('/response');

      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <>
      <Flex
        className={`flex relative flex-col md:gap-[1vh] alliance-2 ${className}`}
        style={style}
      >
        <Upload
          accept={accept}
          onChange={handleChange}
          showUploadList={false}
          className='alliance-2'
        >
          <div className='flex cursor-pointer flex-row justify-between items-center place-items-center bg-[#464652] text-[#CDCDD0]  px-[1vw] py-[1vh] gap-[2vw] rounded-full text-[2vh]'>
            <Image
              src={AIIcon}
              className='ml-[0.5vw]'
              alt='AI Icon'
              width={20}
              height={20}
            />

            {placeholder}
            <TextButton text={buttonContent} />
          </div>
        </Upload>
      </Flex>

      {/* Response Layout Modal component */}

      <Modal
        open={openResultsModel}
        className='w-[80vw] relative'
        onCancel={() => setOpenResultsModel(false)}
        footer={null}
      >
        {/* // this is progress tracking bar */}
        <div className='flex flex-col gap-[1vh] place-items-center'>
          <h1 className='text-[#F28729] inter-tight md:text-[3vh] font-medium text-center'>
            Progress
          </h1>
          <h1 className='text-white text-[2.5vh] md:text-[5vh] font-bold alliance-2 text-center'>
            Get matched: Four Dynamic Steps
          </h1>

          <Flex vertical gap="small" style={{ width: 180 }}>
            <p className='text-white'>Parsing Resume Content</p>
            <Progress percent={ progress.resumeScaner == 'STARTED' ? 40: progress.resumeScaner == 'COMPLETED' ? 100: 0} size="small" />

            <p className='text-white'>Matching Company Profiles using AI</p>
            <Progress percent={ progress.openAi == 'STARTED' ? 50: progress.openAi == 'COMPLETED' ? 100: 0} size="small" />

            <p className='text-white'>Matching Job Listings</p>
            <Progress percent={ progress.jobListing == 'STARTED' ? 50: progress.jobListing == 'COMPLETED' ? 100: 0} size="small" />

          </Flex>
          
        </div>
      </Modal>
    </>
  );
};

export default ReusableFileInput;
