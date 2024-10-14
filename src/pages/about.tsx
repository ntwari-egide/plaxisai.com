/**
 * @author: Egide Ntwali
 * @description: The about page
 * @returns {JSX.Element} The about page
 */

import * as React from 'react';

import AboutLayout from '@/component/about';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

export default function AboutPage() {
  return (
    <div className='flex relative flex-col gap-[15vh]'>
      <Seo templateTitle='About' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <AboutLayout />
        <FooterComponent />
      </div>
    </div>
  );
}
