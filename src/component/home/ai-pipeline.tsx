import { Steps } from 'antd';
import Image from 'next/image';

import Screen2 from '../../../public/images/screen-2.png';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const AIPipelineComponent = () => {

  // register gsap
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef<HTMLDivElement>(null);
  const step1 = document.getElementById('step1');

  useEffect(() => {
    // Register gsap ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const element = containerRef.current;
    gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom', // Start when the top of the element hits the bottom of the viewport
        end: 'bottom top', // End when the bottom of the element hits the top of the viewport
        scrub: true, // Smooth scrubbing
        // markers: true, // Add markers for debugging; remove in production
      }
    })
    .fromTo(
      element, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4 }, // Fade in
    )
    .to(
      element, 
      { opacity: 0.1, duration: 0.4 },
    );

  }, []);


  return (
    <div ref={containerRef} className="flex justify-center items-center h-screen overflow-hidden">
    <div className='flex overflow-hidden flex-col md:flex-row px-[2vw] md:px-[3vw] relative top-[3vh] '>
      <div className='md:w-[30vw] flex flex-col gap-[2vh] place-items-center md:place-items-start'>
        <p className='text-[#F28729] inter-tight md:text-[3vh] font-medium'>
          AI Pipeline
        </p>
        <h1 className='text-white text-[2.5vh] md:text-[5vh] font-bold alliance-2 text-center md:text-start'>
          Get matched: Four Dynamic Steps
        </h1>
        <Steps
          direction='vertical'
          current={2}
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
    </div>
  );
};

export default AIPipelineComponent;
