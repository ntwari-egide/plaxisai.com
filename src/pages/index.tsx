/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

import AIPipelineComponent from '@/component/home/ai-pipeline';
import CallToActionComponent from '@/component/home/call-to-action';
import FAQComponent from '@/component/home/faq';
import QuickStats from '@/component/home/quick-stats';
import TestimonialsPage from '@/component/home/testimonials';
import HomeWelcomeComponent from '@/component/home/welcome';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

export default function HomePage() {
  // register gsap
  gsap.registerPlugin(useGSAP);

  const [AITimelineProgress, setAITimelineProgress] = useState<number>();

  const AIPipeAnimes = useRef<HTMLDivElement>(null);
  // const step1 = document.getElementById('step1');

  useEffect(() => {
    // Register gsap ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const AIPipelineEl = AIPipeAnimes.current;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: AIPipelineEl,
          start: 'top bottom', // Start when the top of the element hits the bottom of the viewport
          end: 'bottom top', // End when the bottom of the element hits the top of the viewport
          scrub: true, // Smooth scrubbing
          // markers: true, // Add markers for debugging; remove in production
          onUpdate: (self) => {
            setAITimelineProgress(self.progress);
          },
        },
      })
      .fromTo(
        AIPipelineEl,
        { opacity: 0 },
        { opacity: 1, animationDuration: 0.2 } // Fade in
      )
      .to(AIPipelineEl, { opacity: 0, animationDuraion: 0.2 });
  }, []);

  return (
    <div className='flex relative flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky showNotification />
        {/* Each HomeWelcomeComponent with the same animation, if intended */}
        <HomeWelcomeComponent />
        <div
          ref={AIPipeAnimes}
          className=' md:mt-0 mt-[10vh] ipad-portrait:relative md:sticky top-[10vh]'
        >
          <AIPipelineComponent animationProgress={AITimelineProgress} />
          <div className=' md:h-[230vh] ipad-portrait:hidden'></div>
        </div>
        <TestimonialsPage />
        <QuickStats />
        <FAQComponent />
        <CallToActionComponent />
        <FooterComponent />
      </div>
    </div>
  );
}
