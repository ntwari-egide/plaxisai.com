import { RiArrowRightLine } from "react-icons/ri";

type GradientButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const GradientButton = ({ text, onClick, className, style }: GradientButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={` text-white flex flex-row justify-between items-center place-items-center py-2 button-gradient px-4  rounded-lg ${className} gap-[1vw]`}
            style={style}
        >
            {text}

            <RiArrowRightLine className="text-[3vh]" />

        </button>
    )
}

export default GradientButton