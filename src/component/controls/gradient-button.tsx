import { RiArrowRightLine } from 'react-icons/ri';

type GradientButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
};

const GradientButton = ({
  text,
  onClick,
  className,
  size,
  style,
}: GradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` relative text-white gradient-button flex flex-row justify-between items-center place-items-center button-gradient ${
        size == 'large'
          ? 'px-[3.4vw] py-[3.5vh] text-[7vh]'
          : 'px-[1.4vw] py-[1.5vh] text-[2vh]'
      } ${className} gap-[1vw] rounded-full`}
      style={style}
    >
      {text}
      <RiArrowRightLine
        className={`${size == 'large' ? 'text-[7vh]' : 'text-[3vh]'}`}
      />
    </button>
  );
};

export default GradientButton;
