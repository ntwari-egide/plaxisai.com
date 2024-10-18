/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { SendOutlined } from '@ant-design/icons';
import { Button, Image, Input } from 'antd';
import { RiDownloadLine } from 'react-icons/ri';

import PlaxisAITag from '../job-details/ai-tag';
import PlaxisAIMessage from '../resume-enhancement/ai-message';
import UserMessage from '../resume-enhancement/user-message';
import AIDarkImg from '../../../public/images/ai-icon.png';

const CoverLetterEnhancementLayout = () => {
  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        <div className='w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg'></div>

        <div className='bg-[#F2F2F2] rounded-lg w-[35%] h-[70vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />

          <div className=' bg-white px-[4vh] py-[3vh] rounded-md flex flex-col gap-[3vh] h-[50vh] overflow-auto overflow-y-auto'>
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
        <div className='w-[28vw]'>
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

export default CoverLetterEnhancementLayout;
