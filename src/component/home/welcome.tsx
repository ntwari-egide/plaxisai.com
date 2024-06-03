import Image from 'next/image';
import { RiPlayCircleLine } from 'react-icons/ri';

import ScrollImageAnimations from '../animated/image';
import ReusableFileInput from '../controls/file-input';
import LogoComponent from '../reusable/logo';
import LogoIcon from '../../../public/images/logo-icon.png';
import Screen1Image from '../../../public/images/screen-1.png';

const HomeWelcomeComponent = () => {
  return ( 
    <div className='home-welcome relative'>
      <Image
        src={LogoIcon}
        alt='logo'
        className='w-[80px] h-[80px] m-auto mt-[14vh]'
      />
      <div className=' flex flex-col relative justify-center items-center place-items-center gap-[3vh] mt-[2vh]'>
        <LogoComponent displayAir size='medium' />
        <p className='text-white text-[3.4vh] md:text-[5vh] font-bold text-center px-[10vw] md:px-0 md:w-[40vw] alliance-2'>
          Unlock your career — just upload your resume and see where it can take
          you!
        </p>
        <ReusableFileInput
          placeholder='Upload your resume here'
          buttonContent='Get Matched'
          className='w-auto m-auto'
          accept='.pdf,.doc,.docx'
        />
        <div className='flex flex-row object-center justify-center place-items-center gap-[0.4vw]'>
          <RiPlayCircleLine className='text-[2.5vh] text-white' />
          <p className='text-white text-[1.6vh] font-light'>Watch the video</p>
        </div>
        <div className='sticky top-[20vh]'>
          <ScrollImageAnimations src={Screen1Image} />
        </div>
        <div className=' h-[100vh]'></div>
      </div>
    </div>
  );
};

export default HomeWelcomeComponent;
