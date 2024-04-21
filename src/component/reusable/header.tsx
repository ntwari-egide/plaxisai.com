import GradientButton from "../controls/gradient-button"
import LogoComponent from "./logo"

const HeaderLayout = () => {
    return (
        <header className="px-[2vw] md:px-[3vw] mt-[4vh]">
            <div className="flex flex-row justify-between border border-red">
                <LogoComponent size='medium' />
                <div className="flex flex-col justify-center items-center place-items-center">
                    <nav>
                        <ul className="flex flex-row gap-[5vw]">
                            <li className="text-white text-[2vh] hover:text-[gray] cursor-pointer">Overview</li>
                            <li className="text-white text-[2vh] hover:text-[gray] cursor-pointer">Features</li>
                            <li className="text-white text-[2vh] hover:text-[gray] cursor-pointer">FAQ</li>
                            <li className="text-white text-[2vh] hover:text-[gray] cursor-pointer">About</li>
                        </ul>
                    </nav>
                </div>
                <GradientButton text='Get Started'  />
            </div>
        </header>
    )
}

export default HeaderLayout