/**
 * @author: Egide Ntwali
 * @description: The home page
 * @returns {JSX.Element} The home page
 */

import * as React from 'react';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-[15vh]'>
      <Seo templateTitle='Home' />
      <div className=' bg-[#F1E7E8] min-h-[100vh]'>
        <HeaderLayout activeTab='home' />
        <WelcomeHome />
      </div>
    </div>
  );
}
