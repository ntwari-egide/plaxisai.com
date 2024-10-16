import { Image } from 'antd';

import AIIcon from '../../../public/images/ai-icon.png';

const PlaxisAITag = () => {
  return (
    <div className='flex flex-row items-center gap-[0.5vh] bg-white px-[2vh] py-[1vh] w-[7em] rounded-full'>
      <Image src={AIIcon.src} className='h-[15px] w-[15px]' />

      <h1 className='inter-tight text-[1.6vh] font-semibold'>Plaxis AI</h1>
    </div>
  );
};

export default PlaxisAITag;
