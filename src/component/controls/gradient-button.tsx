import { RiArrowRightLine } from 'react-icons/ri';

type GradientButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const GradientButton = ({
  text,
  onClick,
  className,
  style,
}: GradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` relative text-white gradient-button flex flex-row justify-between items-center place-items-center button-gradient px-[1.4vw] py-[1.5vh] ${className} gap-[1vw] rounded-full`}
      style={style}
    >
      {text}

      <RiArrowRightLine className='text-[3vh]' />
    </button>
  );
};

export default GradientButton;
