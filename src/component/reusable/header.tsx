import { useEffect, useState } from 'react';

import LogoComponent from './logo';
import GradientButton from '../controls/gradient-button';

type HeaderLayoutProps = {
  sticky?: boolean;
};

const HeaderLayout = ({ sticky }: HeaderLayoutProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-[6vw] z-50 md:px-[3vw] mt-[3vh] ${
        sticky ? 'md:sticky top-[3vh]' : ''
      }`}
    >
      <div className='flex flex-row justify-between justify-items-center place-items-center'>
        <LogoComponent size='medium' />
        <div className='flex flex-col justify-center items-center place-items-center'>
          <nav
            className={`${
              scrolled ? 'header_grassmorpshism' : ''
            } px-[3vw] py-[2vh] md:block hidden`}
          >
            <ul className='flex flex-row gap-[5vw]'>
              <li className='text-white text-[2vh] hover:text-[gray] cursor-pointer'>
                Overview
              </li>
              <li className='text-white text-[2vh] hover:text-[gray] cursor-pointer'>
                Features
              </li>
              <li className='text-white text-[2vh] hover:text-[gray] cursor-pointer'>
                FAQ
              </li>
              <li className='text-white text-[2vh] hover:text-[gray] cursor-pointer'>
                About
              </li>
            </ul>
          </nav>
        </div>
        <GradientButton text='Get Started' />
      </div>
    </header>
  );
};

export default HeaderLayout;
