import { RiArrowRightLine } from 'react-icons/ri';

type TextButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const TextButton = ({ text, onClick, className, style }: TextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` relative text-white bg-[#3D3D44] flex flex-row justify-between items-center place-items-center border border-[#6A6A6F] px-[1.4vw] py-[1.5vh] ${className} gap-[1vw] rounded-full w-[15vw] flex flex-col md:flex-row place-items-center md:w-auto`}
      style={style}
    >
      <span className=' hidden md:block'>{text}</span>

      <RiArrowRightLine className='text-[3vh]' />
    </button>
  );
};

export default TextButton;
