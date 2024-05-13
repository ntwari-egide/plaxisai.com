import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Flex, Modal, Upload, UploadProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { GetProps, useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';

import { uploadFile } from '@/features/resume-scanner';

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

  const [openResultsModel, setOpenResultsModel] = useState(false);

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const { error, response } = useSelector(
    (state: RootState) => state.resumeScanner
  );

  const getBase64 = (img: FileType, callback: (imageUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // send the file to the server api for processing
      const formData = new FormData();
      formData.append('file', info.file.originFileObj as File);
      dispatch(uploadFile(formData));

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
        onClick={() => setOpenResultsModel(true)}
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
        <div className='text-white'>{response}</div>
      </Modal>
    </>
  );
};

export default ReusableFileInput;
