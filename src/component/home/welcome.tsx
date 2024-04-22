import Image from 'next/image';

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
      <div className=' flex flex-col justify-center items-center place-items-center gap-[4vh] mt-[2vh]'>
        <LogoComponent displayAir size='medium' />
        <p className='text-white text-[5vh] text-center w-[40vw]'>
          Unlock your career — just upload your resume and see where it can take
          you!
        </p>
        <ReusableFileInput
          placeholder='Upload your resume here'
          buttonContent='Get Matched'
        />
      </div>
    </div>
  );
};

export default HomeWelcomeComponent;
