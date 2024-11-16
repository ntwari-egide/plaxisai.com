/* eslint-disable unused-imports/no-unused-vars */
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Flex, message } from 'antd';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';

import { uploadFile } from '@/features/resume-scanner';
import { encryptData } from '@/utils/encryptions';

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
  const Router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const { error, response } = useSelector(
    (state: RootState) => state.resumeScanner
  );

  const getBase64 = (img: File, callback: (imageUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const resumeText = await dispatch(uploadFile(formData)).unwrap();

      // set this encrypted format resume content to the cookies
      Cookies.set(
        'resume-content',
        await encryptData(JSON.stringify(resumeText.content)),
        { expires: 7 }
      );

      // router to the scanning page
      Router.push('/scanning');
    } catch (error) {
      message.error('Error processing the file');
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
                'Upload your resume here!',
                'Get matched!',
                'Just one upload away!',
                'Upload your resume here!',
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
    </>
  );
};

export default ReusableFileInput;
