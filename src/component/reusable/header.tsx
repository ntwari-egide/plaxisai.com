import LogoComponent from "./logo"

const HeaderLayout = () => {
    return (
        <header className="px-[2vw] md:px-[3vw] mt-[4vh]">
            <div className="flex flex-row justify-between">
                <LogoComponent size='medium' />
                <div>
                    <nav>
                        <ul className="flex flex-row gap-4">
                            <li className="text-white">Home</li>
                            <li className="text-white">About</li>
                            <li className="text-white">Contact</li>
                        </ul>
                    </nav>
                </div>
                <button className="bg-[#FFA500] text-white px-4 py-2 rounded-lg">Sign Up</button>
            </div>
        </header>
    )
}

export default HeaderLayout