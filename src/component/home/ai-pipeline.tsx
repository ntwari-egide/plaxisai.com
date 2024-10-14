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
      className='flex overflow-hidden flex-col md:flex-row px-[2vw] justify-items-center h-full md:px-[3vw] ipad-portrait:flex-col relative top-[10vh] '
      id='features'
    >
      <div className='md:w-[30vw] ipad-landscape:w-[40vw] ipad-portrait:w-full ipad-portrait:object-center ipad-portrait:items-center flex flex-col gap-[2vh] place-items-center md:place-items-start'>
        <p className='text-[#F28729] inter-tight md:text-[3vh] font-medium'>
          AI Pipeline
        </p>
        <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start'>
          AI-Driven Matching: Quick and Precise
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
                'Your resume is meticulously analyzed by our cutting-edge algorithm, ensuring no detail is missed.',
            },
            {
              title: 'Matching Profiles',
              description:
                'Our intelligent system scans over 5 million employers, pinpointing the perfect match for you in mere seconds.',
            },
            {
              title: 'Revealing Best Matches',
              description:
                'Instantly access a curated list of top-matching companies and positions.',
            },
          ]}
        />
        <GradientButton
          href='#home'
          text='Use It for Free'
          className='mt-[1vh] text-white bg-[#348888]'
          theme='colorfull'
          backgroundColor='#348888'
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
          className='w-[84vw] h-[85vh] absolute -[20vw] object-cover'
        />
      </div>
    </div>
  );
};

export default AIPipelineComponent;
