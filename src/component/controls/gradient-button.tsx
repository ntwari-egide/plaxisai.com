import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri';

type GradientButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  href?: string;
  theme?: 'colorfull' | 'transparent';
  backgroundColor?: string;
  removeIcon?: boolean;
};

const GradientButton = ({
  text,
  onClick,
  className,
  size,
  style,
  href,
  theme,
  backgroundColor,
  removeIcon
}: GradientButtonProps) => {
  return (
    <>
      {href ? (
        <Link href={href} target={`${href != '' ? '_blank' : ''}`}>
          <button
            onClick={onClick}
            className={` cursor-pointer hover:scale-[1.04] transition-all relative text-[#000000] flex flex-row justify-between items-center inter-tight place-items-center  border-[2px] ${
              theme == 'colorfull'
                ? `border-[${backgroundColor}] bg-[${backgroundColor}] `
                : 'border-[#09090D] bg-transparent'
            }  ${
              size == 'large'
                ? 'px-[10vw] md:px-[3.4vw] py-[1.5vh] md:py-[3.5vh] text-[2.5vh] md:text-[7vh] ipad-portrait:text-[4vh]'
                : 'px-[4vw] md:px-[1.4vw] py-[1vh] text-[1.6vh] font-semibold'
            } ${className} gap-[1vw] rounded-full`}
            style={style}
          >
            {text}
            <RiArrowRightLine
              className={`${
                size == 'large' ? ' text-[5vh] md:text-[7vh]' : 'text-[2.4vh]'
              } `}
            />
          </button>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={` cursor-pointer hover:scale-[1.04] transition-all relative text-[#000000] gradient-button flex flex-row justify-between items-center place-items-center button-gradient ${
            size == 'large'
              ? 'px-[10vw] md:px-[3.4vw] py-[1.5vh] md:py-[3.5vh] text-[2.5vh] md:text-[7vh] ipad-portrait:text-[4vh]'
              : 'px-[4vw] md:px-[1.4vw] py-[1.5vh] text-[2vh]'
          } ${className} gap-[1vw] rounded-full`}
          style={style}
        >
          {text}
          { removeIcon ? '': <RiArrowRightLine
            className={`${
              size == 'large' ? ' text-[5vh] md:text-[7vh]' : 'text-[3vh]'
            } rotate-45`}
          />}
        </button>
      )}
    </>
  );
};

export default GradientButton;
