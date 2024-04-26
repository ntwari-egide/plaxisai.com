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
import ResponseLayout from '@/component/response';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout />
        <div className='relative w-[90vw] m-auto'>
            <ResponseLayout />
        </div>
        <CallToActionComponent />
        <FooterComponent />
      </div>
    </div>
  );
}
