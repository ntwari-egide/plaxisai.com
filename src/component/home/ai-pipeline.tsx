/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Steps } from 'antd';
import Image from 'next/image';

import GradientButton from '../controls/gradient-button';
import screen1 from '../../../public/images/data-extraction.gif';
import Screen2 from '../../../public/images/matching-profile.gif';
import Screen3 from '../../../public/images/reveal-best-matches.gif';

interface AIPipelineComponentProps {
  animationProgress: number | undefined;
}

const AIPipelineComponent = ({
  animationProgress,
}: AIPipelineComponentProps) => {
  return (
    <div
      className='flex overflow-hidden flex-col md:flex-row px-[2vw] md:px-[3vw] ipad-portrait:flex-col relative top-[3vh] '
      id='features'
    >
      <div className='md:w-[30vw] ipad-landscape:w-[40vw] ipad-portrait:w-full ipad-portrait:object-center ipad-portrait:items-center flex flex-col gap-[2vh] place-items-center md:place-items-start'>
        <p className='text-[#F28729] inter-tight md:text-[3vh] font-medium'>
          AI Pipeline
        </p>
        <h1 className='text-white text-[2.5vh] md:text-[5vh] font-bold alliance-2 text-center md:text-start'>
          Get matched: <br className='hidden md:block' /> 3 Dynamic Steps
        </h1>
        <Steps
          direction='vertical'
          current={
            animationProgress! < 0.3 ? 0 : animationProgress! < 0.5 ? 1 : 2
          }
          className='alliance-2'
          items={[
            {
              title: 'Extracting Data',
              description:
                'Your resume is now being dissected by our advanced algorithm',
            },
            {
              title: 'Matching Profiles',
              description:
                'Our system is intelligently comparing your credentials with over 5M+ potential employers to find the perfect fit with in seconds.',
            },
            {
              title: 'Revealing Best Matches',
              description:
                'Access tailored matching companies and their grade your next career opportunity instantly.',
            },
          ]}
        />
        <GradientButton
          href='#home'
          text='Use It for Free'
          className='mt-[5vh]'
        />
      </div>
      <div className='w-[70vw] ipad-landscape:w-[60vw] h-full hidden md:block'>
        <Image
          src={
            animationProgress! < 0.3
              ? screen1
              : animationProgress! < 0.5
              ? Screen2
              : Screen3
          }
          alt='screen-2'
          className='w-[84vw] h-[80vh] absolute -[20vw] object-cover'
        />
      </div>
    </div>
  );
};

export default AIPipelineComponent;
