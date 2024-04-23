import {
  RiDiscordFill,
  RiGithubFill,
  RiLinkedinFill,
  RiYoutubeFill,
} from 'react-icons/ri';

import LogoComponent from '../reusable/logo';

const FooterComponent = () => {
  return (
    <div className='mt-[23vh] px-[2vw] md:px-[3vw] pb-[4vh] '>
      <div className='min-h-[40vh] justify-between flex flex-row gap-[10vw]'>
        <div className='flex flex-col justify-between h-[40vh]'>
          <LogoComponent size='medium' />
        </div>
        <div>
          <h2 className='text-white text-[3.5vh] font-bold'>Explore</h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Resume Templates
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Resume Reviews
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Resume Writing
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-white text-[3.5vh] font-bold'>Resources</h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              FAQ
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Updates
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Help Center
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Contact
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-white text-[3.5vh] font-bold'>Company</h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Community
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              About
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Blog
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Privacy Policy
            </li>
            <li className='text-[2vh] text-[#78787A] hover:text-white transition-all cursor-pointer'>
              Terms of Service
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-[1.4vh] text-[#78787A]'>
          GetHiredHints © {new Date().getFullYear()}, <br /> All Rights Reserved
        </p>
        <div className='flex flex-row gap-[1vw]'>
          <RiLinkedinFill className='text-[3.5vh] text-[white] cursor-pointer' />
          <RiGithubFill className='text-[3.5vh] text-[white] cursor-pointer' />
          <RiYoutubeFill className='text-[3.5vh] text-[white] cursor-pointer' />
          <RiDiscordFill className='text-[3.5vh] text-[white] cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
