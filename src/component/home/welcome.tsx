import { useGSAP } from '@gsap/react';
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
  gsap.registerPlugin(useGSAP);

  const homeGifs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register gsap ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const homeElement = homeGifs.current;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: homeElement,
          start: 'top bottom', // Start when the top of the element hits the bottom of the viewport
          end: 'bottom top', // End when the bottom of the element hits the top of the viewport
          scrub: true, // Smooth scrubbing
          // markers: true, // Add markers for debugging; remove in production
        },
      })
      .fromTo(
        homeElement,
        { width: '60vw', opacity: 0.4 },
        { width: '80vw', opacity: 1 }
      );
  }, []);

  return (
    <div className='home-welcome relative' id='home'>
      <Image
        src={LogoIcon}
        alt='logo'
        className='w-[80px] h-[80px] m-auto mt-[14vh]'
      />
      <div className=' flex flex-col relative justify-center items-center place-items-center gap-[3vh] mt-[2vh]'>
        <LogoComponent displayAir size='medium' />
        <p className='text-white text-[3.4vh] md:text-[5vh] font-bold text-center px-[10vw] md:px-0 md:w-[40vw] alliance-2'>
          Unlock your career: Just upload your resume,{' '}
          <span className=' text-[#cdcdd09b]'>no sign-up needed.</span>
        </p>
        <ReusableFileInput
          placeholder='Upload your resume here'
          buttonContent='Get Matched'
          className='w-auto m-auto'
          accept='.pdf,.doc,.docx'
        />
        <div className='flex flex-row object-center justify-center place-items-center gap-[0.4vw]'>
          <RiPlayCircleLine className='text-[2.5vh] text-white' />
          <p className='text-white text-[1.6vh] font-light'>Watch the video</p>
        </div>
        <div className='hidden md:block]'>
          <div className='sticky top-[5vh] -mt-[15vh] -z-10' ref={homeGifs}>
            <ScrollImageAnimations src={Screen1Image} />
          </div>
          <div className=' h-[100vh]'></div>
        </div>
      </div>
    </div>
  );
};

export default HomeWelcomeComponent;
