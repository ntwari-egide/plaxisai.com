// components/ScrollImage.tsx
import Image, { StaticImageData } from 'next/image';
import React, { useEffect } from 'react';
import FileInputImg from '../../../public/images/file-input.png';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ScrollImageAnimationsProps {
  src: StaticImageData;
}

const ScrollImageAnimations = ({ src }: ScrollImageAnimationsProps) => {

  gsap.registerPlugin(useGSAP);

  const fileInputImg = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register gsap ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const fileInputImgEl = fileInputImg.current;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: fileInputImgEl,
          start: 'top bottom', // Start when the top of the element hits the bottom of the viewport
          end: 'bottom top', // End when the bottom of the element hits the top of the viewport
          scrub: true, // Smooth scrubbing
          // markers: true, // Add markers for debugging; remove in production
        },
      })
      .fromTo(
        fileInputImgEl,
        { opacity: 0, width: '20vw', top: '24vh', zIndex: -1, delay: 0.5},
        { opacity: 1, width: '35vw', top: 'auto', zIndex: 'auto', animationDuration: 0.2 } // Fade in
      )
  }
  , []);

  return (
    <div
      className='flex justify-center relative items-center h-screen overflow-hidden'
    >
      <Image
        src={src}
        className='transition-all duration-300 mt-4'
        alt='Scrolling Image pointer-events-none'
      />

      <div ref={fileInputImg} className='absolute'>
        <Image
          src={FileInputImg}
          className='transition-all duration-300 mt-4 pointer-events-none w-full m-auto'
          alt='Scrolling Image'
        />
      </div>
      
    </div>
  );
};

export default ScrollImageAnimations;
