import { RiArrowRightLine } from 'react-icons/ri';

type TextButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const TextButton = ({
  text,
  onClick,
  className,
  style,
}: TextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` relative text-white bg-[#3D3D44] flex flex-row justify-between items-center place-items-center border border-[#6A6A6F] px-[1.4vw] py-[1.5vh] ${className} gap-[1vw] rounded-full`}
      style={style}
    >
      {text}

      <RiArrowRightLine className='text-[3vh]' />
    </button>
  );
};

export default TextButton;
