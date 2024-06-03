import { useEffect, useRef } from 'react';
import GradientButton from '../controls/gradient-button';
import { SplitChars, Controls, Tween } from 'react-gsap';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';



const CallToActionComponent = () => {
  gsap.registerPlugin(useGSAP);

  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ paused: true });

    const play = () => tl.play();
    const reverse = () => tl.reverse();

    return () => {
      tl.kill(); // Cleanup GSAP animation
    };
  }, []);

  return (
    <div className='call-to-action relative mt-[10vh] md:mt-[35vh] flex flex-col md:gap-[6vh] place-items-center'>
      <h1 ref={textRef}  className='text-white text-[4vh] md:text-[8vh] font-bold text-center w-[80vw] md:w-[50vw] m-auto alliance-2'> 
      Your next great job is just one upload away.
      </h1>
      <GradientButton size='large' text='Get Started' className='mt-[5vh]' />
    </div>
  );
};

export default CallToActionComponent;
