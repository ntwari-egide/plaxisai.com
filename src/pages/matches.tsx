/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

import FooterComponent from '@/component/layouts/footer';
import ResponseLayout from '@/component/response';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

export default function HomePage() {
  return (
    <div className='flex flex-col relative gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className='welcome-bg relative flex justify-between flex-col'>
        <HeaderLayout />
        <ResponseLayout />
        <FooterComponent />
      </div>
    </div>
  );
}
