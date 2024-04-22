/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

import HomeWelcomeComponent from '@/component/home/welcome';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';
import AIPipelineComponent from '@/component/home/ai-pipeline';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg'>
        <HeaderLayout />
        <HomeWelcomeComponent />
        <AIPipelineComponent />
        <div className='min-h-[390vh]'></div>
      </div>
    </div>
  );
}
