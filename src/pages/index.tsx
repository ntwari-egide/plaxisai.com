/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

import AIPipelineComponent from '@/component/home/ai-pipeline';
import CallToActionComponent from '@/component/home/call-to-action';
import FAQComponent from '@/component/home/faq';
import HomeWelcomeComponent from '@/component/home/welcome';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

export default function HomePage() {
  return (
    <div className='flex relative flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        {/* Each HomeWelcomeComponent with the same animation, if intended */}
        <HomeWelcomeComponent />
        <div className=' sticky top-[0vh]'>
          <AIPipelineComponent />
          <div className=' h-[200vh]'>

          </div>
        </div>
        <FAQComponent />
        <CallToActionComponent />
        <FooterComponent />
      </div>
    </div>
  );
}
