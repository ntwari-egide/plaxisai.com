import Image from 'next/image';

import LogoImage from '../../../public/images/logo.png';
import MainLogoImage from '../../../public/images/main-logo.png';

type LogoProps = {
  size: 'small' | 'medium' | 'large';
  displayAir?: boolean;
};

const LogoComponent = ({ size, displayAir }: LogoProps) => {
  return (
    <div className=' flex flex-row object-center items-center gap-[1vw]'>
      {!displayAir && (
        <Image src={MainLogoImage} alt='Logo' className='h-[5vh] w-full' />
      )}
      <h1
        className={`${
          size === 'small'
            ? 'text-2xl'
            : size === 'medium'
            ? 'text-[3vh]'
            : 'text-5xl'
        } text-white`}
      >
        {displayAir ? (
          <Image src={LogoImage} alt='Logo' className='h-[3vh] w-full' />
        ) : (
          ''
        )}
      </h1>
    </div>
  );
};

export default LogoComponent;
