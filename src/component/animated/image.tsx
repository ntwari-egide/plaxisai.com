// components/ScrollImage.tsx
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import Image, { StaticImageData } from 'next/image';
import React, { useRef } from 'react';


interface ScrollImageAnimationsProps {
    src: StaticImageData;
}

const ScrollImageAnimations = ( { src } : ScrollImageAnimationsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      const element = containerRef.current;
      gsap.fromTo(
        element,
        { width: '40vw', opacity: 0.4 },
        {
          width: '60vw',
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom', // When the top of the element hits the bottom of the viewport
            end: 'bottom top',   // When the bottom of the element hits the top of the viewport
            scrub: true,         // Smooth scrubbing
          },
        }
      );
    }, { scope: containerRef });
  
  return (
    <div ref={containerRef} className='imageContainer'>
        <Image
          src={src}
          className=" mt-[1vh]"
          alt='screen-1'
        />
    </div>
  );
};

export default ScrollImageAnimations;
