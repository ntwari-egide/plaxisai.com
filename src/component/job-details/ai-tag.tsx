import { Image } from 'antd';

import AIIcon from '../../../public/images/ai-icon.png';

type PlaxisAITagProps = {
  size?: 'small' | 'large'
}

const PlaxisAITag = ( { size }: PlaxisAITagProps) => {
  return (
    <div className={`flex flex-row items-center gap-[0.5vh] bg-white ${ size == 'small' ? 'px-[1vh] py-[0.5vh] w-[5em]': 'px-[2vh] py-[1vh] w-[7em]'}  rounded-full`}>
      <Image src={AIIcon.src} className={`${ size == 'small' ? 'h-[10px] w-[10px]': 'h-[15px] w-[15px]' }`}  preview={false} />

      <h1 className={`inter-tight ${size == 'small' ? 'text-[1.3vh]': 'text-[1.6vh] '} font-semibold`}>Plaxis AI</h1>
    </div>
  );
};

export default PlaxisAITag;
