import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { RiPlayCircleLine } from 'react-icons/ri';

import ScrollImageAnimations from '../animated/image';
import ReusableFileInput from '../controls/file-input';
import LogoComponent from '../reusable/logo';
import LogoIcon from '../../../public/images/logo-icon.png';
import Screen1Image from '../../../public/images/screen-1.png';

const HomeWelcomeComponent = () => {
  const homeGifs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const homeElement = homeGifs.current;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: homeElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      .fromTo(
        homeElement,
        { width: '60vw', opacity: 0.4 },
        { width: '80vw', opacity: 1 }
      );
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='home-welcome relative' id='home'>
        <Image
          src={LogoIcon}
          alt='logo'
          fetchPriority='high'
          className='w-[60px] h-[60px] m-auto mt-[14vh]'
        />
        <div className=' flex flex-col relative justify-center items-center place-items-center gap-[3vh] mt-[2vh]'>
          <LogoComponent displayAI size='medium' />
          <p className='text-[#09090D] text-[3.4vh] md:text-[5.3vh] font-bold text-center px-[10vw] md:px-0 ipad-portrait:w-[70vw] md:w-[50vw] leading-[6.7vh]'>
            Unlock your career: Just upload your resume,{' '}
            <span className=' text-[#348888]'>
              no sign-up <br /> needed!
            </span>
          </p>
          <ReusableFileInput
            placeholder='Upload your resume here'
            buttonContent='Get Matched'
            className='w-auto m-auto'
            accept='.pdf,.doc,.docx'
          />
          <div className='flex cursor-pointer flex-row object-center justify-center place-items-center gap-[0.4vw]'>
            <RiPlayCircleLine className='text-[2.5vh] text-[#000000]' />
            <p className='text-[#000000] text-[1.6vh] inter-tight font-semibold'>
              Watch the video
            </p>
          </div>
          <div className='hidden md:block ipad-portrait:hidden'>
            <div className='sticky top-[5vh] -mt-[15vh] -z-10' ref={homeGifs}>
              <ScrollImageAnimations src={Screen1Image} />
            </div>
            <div className=' h-[100vh]'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWelcomeComponent;
