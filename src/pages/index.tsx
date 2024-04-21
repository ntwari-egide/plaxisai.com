/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import Seo from '@/component/seo';
import * as React from 'react';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <h1 className='text-[20vh] alliance-2'>GetHiredHints</h1>
    </div>
  );
}
