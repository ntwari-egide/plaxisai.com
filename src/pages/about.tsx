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
import HomeWelcomeComponent from '@/component/home/welcome';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';
import AboutLayout from '@/component/about';

export default function HomePage() {
  
  return (
    <div className='flex relative flex-col gap-[15vh]'>
      <Seo templateTitle='About' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <AboutLayout />
      </div>
    </div>
  );
}
