/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Image, Select } from 'antd';
import { RiDownload2Line, RiDownloadLine, RiGroupLine } from 'react-icons/ri';

import PlaxisAITag from '../job-details/ai-tag';
import AIDarkImg from '../../../public/images/ai-icon.png';
import AILightImg from '../../../public/images/ai-icon-white.png';

const ResumeEnhancementLayout = () => {
  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        <div className='w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg'></div>

        <div className='bg-[#F2F2F2] rounded-lg w-[35%] h-[70vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
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
              <div className="flex flex-col gap-[1vh]">
              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#348888] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Work Experience (99.5%)
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#6A6C72] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certifications (96.7%)
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#173440] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certification (99.8%)
                </p>
              </div>
              </div>

              <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
            99.1%
          </h1>
            </div>
          </div>

          <div className=' bg-white px-[4vh] py-[3vh] rounded-md flex flex-col gap-[3vh]'>

            

            <div className='flex flex-row gap-[1vw] ml-[2vw]'>
                <Image 
                className='h-[40px] w-[35px] rounded-full object-cover border'
                src='https://images.pexels.com/photos/28570314/pexels-photo-28570314/free-photo-of-confident-young-woman-in-glasses-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                preview={false}
                />

                <p className='inter-tight text-[1.6vh] w-[60%] text-[#848486] font-medium'>Can you improve the description to pass the requirements </p>
            </div>
           
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center object-center">
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

export default ResumeEnhancementLayout;
