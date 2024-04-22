import Image from 'next/image';
import { RiPlayCircleLine } from 'react-icons/ri';

import ReusableFileInput from '../controls/file-input';
import LogoComponent from '../reusable/logo';
import LogoIcon from '../../../public/images/logo-icon.png';

const HomeWelcomeComponent = () => {
  return (
    <div className='home-welcome'>
      <Image
        src={LogoIcon}
        alt='logo'
        className='w-[80px] h-[80px] m-auto mt-[14vh]'
      />
      <div className=' flex flex-col justify-center items-center place-items-center gap-[3vh] mt-[2vh]'>
        <LogoComponent displayAir size='medium' />
        <p className='text-white text-[5vh] font-bold text-center w-[40vw]'>
          Unlock your career — just upload your resume and see where it can take
          you!
        </p>
        <ReusableFileInput
          placeholder='Upload your resume here'
          buttonContent='Get Matched'
        />
        <div className='flex flex-row object-center justify-center place-items-center gap-[0.4vw]'>
          <RiPlayCircleLine className='text-[3.5vh] text-white' />
          <p className='text-white text-[2vh] font-light'>Watch the video</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWelcomeComponent;
