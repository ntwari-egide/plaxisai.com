import { RiArrowRightLine } from 'react-icons/ri';

type TextButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  isContentImportant?: boolean;
};

const TextButton = ({
  text,
  onClick,
  className,
  style,
  isContentImportant,
}: TextButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={` relative text-white bg-[#3D3D44] flex flex-row justify-between items-center place-items-center border border-[#6A6A6F] px-[1.4vw] py-[1.5vh] ${className} gap-[1vw] rounded-full flex ${
        isContentImportant
          ? 'flex-row px-[6vw]'
          : 'flex-col md:flex-row w-[15vw]'
      } place-items-center md:w-auto`}
      style={style}
    >
      <span className={` ${isContentImportant ? 'block' : 'hidden md:block'}`}>
        {text}
      </span>

      <RiArrowRightLine className='text-[3vh]' />
    </button>
  );
};

export default TextButton;
