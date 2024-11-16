/* eslint-disable jsx-a11y/alt-text */
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import logger from '@/lib/logger';

import { getRealUserInfo, validateJwtToken } from '@/utils/auth';

import LogoComponent from './logo';
import GradientButton from '../controls/gradient-button';

type HeaderLayoutProps = {
  sticky?: boolean;
};

const HeaderLayout = ({ sticky }: HeaderLayoutProps) => {
  const [isNotificationCanceled, setNotificationCanceling] =
    useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (await validateJwtToken()) {
          const _userInfo = await getRealUserInfo(); // Await the async call
          setUserDetails(_userInfo.data);
        } else {
          // logger('JWT token is invalid or expired');
        }
      } catch (error) {
        // logger(error, 'Error validating token or fetching user info:');
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <header
      className={`${
        sticky
          ? 'md:sticky top-0 z-[90] py-4 md:py-0 header_grassmorpshism'
          : ''
      }`}
    >
      <div className='flex px-[6vw] items-center my-[1vh] z-50 md:px-[3vw] flex-row justify-between justify-items-center place-items-center'>
        <Link href='/'>
          <LogoComponent size='medium' />
        </Link>
        <div className='flex flex-col justify-center items-center place-items-center'>
          <nav
            className={` px-[3vw] py-[2vh] md:block hidden ipad-portrait:hidden`}
          >
            <ul className='flex flex-row gap-[5vw]'>
              <Link href='/#home'>
                <li className='text-[#000000] font-semibold inter-tight transition-all text-[1.7vh] hover:text-[gray] cursor-pointer'>
                  Overview
                </li>
              </Link>
              <Link href='/#features'>
                <li className='text-[#000000] font-semibold inter-tight transition-all text-[1.7vh] hover:text-[gray] cursor-pointer'>
                  Documentation
                </li>
              </Link>
              <Link href='/#features'>
                <li className='text-[#000000] font-semibold inter-tight transition-all text-[1.7vh] hover:text-[gray] cursor-pointer'>
                  Features
                </li>
              </Link>
              <Link href='/#faq'>
                <li className='text-[#000000] font-semibold inter-tight transition-all text-[1.7vh] hover:text-[gray] cursor-pointer'>
                  FAQ
                </li>
              </Link>
              <Link href='/about'>
                <li className='text-[#000000] font-semibold inter-tight transition-all text-[1.7vh] hover:text-[gray] cursor-pointer'>
                  About
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        {userDetails ? (
          <div className='flex flex-row items-center gap-[1vw]'>
            <BellOutlined className='text-[2vh] cursor-pointer hover:rotate-6 transition-all' />

            {userDetails.profilePic ? (
              <Image
                src={userDetails.profilePic}
                className='h-[35px] w-[35px] rounded-full object-contain'
                preview={false}
              />
            ) : (
              <Avatar size='large' gap={4} className=' bg-[#348888]'>
                {userDetails.firstName.charAt(0)}
              </Avatar>
            )}

            <p className='whyteInktrap_font mt-1 text-[1.7vh] font-semibold'>
              {' '}
              {userDetails.firstName + ' ' + userDetails.lastName}
            </p>

            <DownOutlined className=' cursor-pointer' />
          </div>
        ) : (
          <div className='flex flex-row gap-[2vw]'>
            <GradientButton
              backgroundColor='#F28729'
              text='Login'
              theme='colorfull'
              href='/login'
              className='bg-[#F28729] border-[#F28729]'
            />
            <GradientButton text='Get Started' href='/signup' />
          </div>
        )}
      </div>
      <div
        className={`${
          isNotificationCanceled ? 'hidden' : 'block'
        } bg-[rgb(218,218,220)] py-[1vh] border-t-[1px] border-[#348888] flex justify-between flex-row px-[2vw]`}
      >
        <div className='w-full'>
          <p className='text-[#09090D] text-center inter-tight text-[1.6vh]'>
            Trial of Our AI <span className='italic'>“Speak To Me”</span> Cloud
            model service is now live. Explore it now!
          </p>
        </div>

        <RiCloseLine
          className='cursor-pointer text-[#09090D] text-[2.5vh]'
          onClick={() => setNotificationCanceling(true)}
        />
      </div>
    </header>
  );
};

export default HeaderLayout;
