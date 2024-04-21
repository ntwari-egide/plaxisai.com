/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <HeaderLayout />
    </div>
  );
}
