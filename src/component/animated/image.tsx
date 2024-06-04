// components/ScrollImage.tsx
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef } from 'react';

interface ScrollImageAnimationsProps {
  src: StaticImageData;
}

const ScrollImageAnimations = ({ src }: ScrollImageAnimationsProps) => {
  // register gsap
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register gsap ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const element = containerRef.current;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top bottom', // Start when the top of the element hits the bottom of the viewport
          end: 'bottom top', // End when the bottom of the element hits the top of the viewport
          scrub: true, // Smooth scrubbing
          // markers: true, // Add markers for debugging; remove in production
        },
      })
      .fromTo(
        element,
        { width: '60vw', opacity: 0.4 },
        { width: '80vw', opacity: 1 }
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className='flex justify-center items-center h-screen overflow-hidden'
    >
      <Image
        src={src}
        className='transition-all duration-300 mt-4'
        alt='Scrolling Image'
      />
    </div>
  );
};

export default ScrollImageAnimations;
