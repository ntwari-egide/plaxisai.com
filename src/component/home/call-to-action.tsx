import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import GradientButton from '../controls/gradient-button';

const CallToActionComponent = () => {
  gsap.registerPlugin(useGSAP);

  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ paused: true });

    return () => {
      tl.kill(); // Cleanup GSAP animation
    };
  }, []);

  return (
    <div className='call-to-action relative mt-[10vh] md:mt-[35vh] flex flex-col md:gap-[6vh] ipad-portrait:mt-[15vh] place-items-center'>
      <h1
        ref={textRef}
        className='text-[#000000] text-[4vh] md:text-[8vh] font-bold text-center w-[80vw] md:w-[54vw] m-auto whyteInktrap_font leading-[12vh] ipad-portrait:text-[5vh] ipad-portrait:[90vw]'
      >
        Your next great job is just one upload away.
      </h1>

      <GradientButton
        href='#home'
        size='large'
        text='Get Started'
        className='mt-[1vh] text-white bg-[#09090D]'
        theme='colorfull'
        backgroundColor='#09090D'
      />
    </div>
  );
};

export default CallToActionComponent;
