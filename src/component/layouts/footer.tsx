import Link from 'next/link';
import {
  RiDiscordFill,
  RiGithubFill,
  RiLinkedinFill,
  RiYoutubeFill,
} from 'react-icons/ri';

import LogoComponent from '../reusable/logo';

const FooterComponent = () => {
  return (
    <div className='mt-[15vh] md:mt-[23vh] z-30 px-[6vw] md:px-[3vw] pb-[4vh] border-t border-t-[#E6E6E7] pt-[4vh] '>
      <div className='min-h-[40vh] justify-between md:flex grid grid-cols-2 flex-col md:flex-row ipad-portrait:gap-[2vw] gap-[10vw]'>
        <div className='flex flex-col justify-between md:h-[40vh]'>
          <LogoComponent size='medium' />
        </div>
        <div>
          <h2 className='text-[#000000] text-[1.5vh] md:text-[2vh] ipad-portrait:text-[2vh] font-medium'>
            Overview
          </h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Resume Templates
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Resume Reviews
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Resume Writing
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-[#000000] text-[1.5vh] md:text-[2vh] ipad-portrait:text-[2vh] font-medium'>
            Documentation
          </h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Help Center
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Documentation
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Versioning Info
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-[#000000] text-[1.5vh] md:text-[2vh] ipad-portrait:text-[2vh] font-medium'>
            Resources
          </h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              FAQ
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Updates
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Help Center
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Contact
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-[#000000] text-[1.5vh] md:text-[2vh] ipad-portrait:text-[2vh] font-medium'>
            Company
          </h2>
          <ul className='flex flex-col gap-[1.5vh] mt-[2vh]'>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Community
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              About
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Blog
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Privacy Policy
            </li>
            <li className='text-[1.7vh] text-[#09090D] hover:text-[#000000] transition-all cursor-pointer ipad-portrait:text-[1.5vh]'>
              Terms of Service
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-row justify-between md:mt-0 mt-[10vh]'>
        <p className='text-[1.4vh] text-[#78787A]'>
          Plaxis AI © {new Date().getFullYear()}, <br /> All Rights Reserved
        </p>
        <div className='flex flex-row gap-[1vw]'>
          <Link
            href='https://www.linkedin.com/company/plaxis-ai'
            target='_blank'
          >
            <RiLinkedinFill className='text-[3.5vh] text-[white] cursor-pointer' />
          </Link>
          <Link href='https://github.com/Plaxis-AI' target='_blank'>
            <RiGithubFill className='text-[3.5vh] text-[white] cursor-pointer' />
          </Link>
          <Link href='' target='_blank'>
            <RiYoutubeFill className='text-[3.5vh] text-[white] cursor-pointer' />
          </Link>
          <Link href='https://discord.gg/PDbwTa6b' target='_blank'>
            <RiDiscordFill className='text-[3.5vh] text-[white] cursor-pointer' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
