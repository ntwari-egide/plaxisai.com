import { Steps } from 'antd';
import Image from 'next/image';

import Screen2 from '../../../public/images/screen-2.png';

const AIPipelineComponent = () => {
  return (
    <div className='flex flex-col md:flex-row px-[2vw] md:px-[3vw] relative top-[3vh] '>
      <div className='md:w-[30vw] flex flex-col gap-[2vh] place-items-center md:place-items-start'>
        <p className='text-[#F28729] inter-tight md:text-[3vh] font-medium'>
          AI Pipeline
        </p>
        <h1 className='text-white text-[2.5vh] md:text-[5vh] font-bold alliance-2 text-center md:text-start'>
          Get matched: Four Dynamic Steps
        </h1>
        <Steps
          direction='vertical'
          current={4}
          progressDot
          className='alliance-2'
          items={[
            {
              title: 'Initiating Upload...',
              description:
                'Begin by securely uploading your resume into our precision-engineered system.',
            },
            {
              title: 'Analyzing Data...',
              description:
                'Your resume is now being dissected by our advanced algorithm',
            },
            {
              title: 'Matching Profiles...',
              description:
                'Our system is intelligently comparing your credentials with potential employers to find the perfect fit',
            },
            {
              title: 'Revealing Opportunities...',
              description:
                'Access tailored job matches and uncover your next career opportunity instantly.',
            },
          ]}
        />
      </div>
      <div className='w-[70vw]'>
        <Image
          src={Screen2}
          alt='screen-2'
          className='w-[80vw] hidden md:block absolute left-[20vw]'
        />
      </div>
    </div>
  );
};

export default AIPipelineComponent;
