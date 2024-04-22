/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

import AIPipelineComponent from '@/component/home/ai-pipeline';
import FAQComponent from '@/component/home/faq';
import HomeWelcomeComponent from '@/component/home/welcome';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';
import CallToActionComponent from '@/component/home/call-to-action';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg'>
        <HeaderLayout />
        <HomeWelcomeComponent />
        <AIPipelineComponent />
        <FAQComponent />
        <CallToActionComponent />
        <div className='min-h-[315vh]'></div>
      </div>
    </div>
  );
}
