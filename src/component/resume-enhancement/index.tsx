/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Image, Select } from 'antd';
import {
  RiArrowRightLine,
  RiGroupLine,
  RiMapPinLine,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';

import JobMatch from '../matches/job';
import { jobMatches } from '../response/job-matches-component';
import AIDarkImg from '../../../public/images/ai-icon.png';
import AILightImg from '../../../public/images/ai-icon-white.png';
import PlaxisAITag from '../job-details/ai-tag';


const ResumeEnhancementLayout = () => {
    return (
        <div className='px-[3vw] mt-[5vh]'>
                  <div className='flex flex-row gap-[4vw]'>
        <div className='w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg'>
          
        </div>

        <div className='bg-[#F2F2F2] rounded-lg w-[35%] h-[78vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />
          <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
            94.9%
          </h1>
          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[2vh]'>
            {/* matching results  */}
            <div className='flex flex-row gap-[0.4vw] items-center'>
              <div className=' bg-[#E5E5E5] w-[25px] flex flex-row h-[25px] items-center justify-center rounded-full'>
                <CheckCircleOutlined className='text-[1.5vh]' />
              </div>
              <h1 className='text-[1.7vh] font-medium'>Matching results</h1>
            </div>

            <div className='flex flex-col gap-[1vh]'>
              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#348888] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Work Experience
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#6A6C72] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certifications
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#173440] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certification
                </p>
              </div>
            </div>
          </div>

          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[3vh]'>
            {/* people  */}
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row gap-[0.4vw] items-center'>
                <div className=' bg-[#E5E5E5] w-[45px] flex flex-row h-[45px] items-center justify-center rounded-full'>
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

            <div className='flex felx-row justify-between'>
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

            <div className='flex flex-row justify-between mt-[2vh] w-full'>
              <Button className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'>
                <Image
                  src={AILightImg.src}
                  className='h-[15px] w-[15px]'
                  preview={false}
                />
                Enhance resume
              </Button>

              <Button className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'>
                <Image
                  src={AIDarkImg.src}
                  className='h-[15px] w-[15px]'
                  preview={false}
                />
                Generate Cover Letter
              </Button>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default ResumeEnhancementLayout;