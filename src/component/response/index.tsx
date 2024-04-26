import { Modal } from "antd";
import { useState } from "react";

type ResponseLayoutProps = {
    onClick?: () => void;
}

const ResponseLayout = ({ onClick}: ResponseLayoutProps) => {

    return (
        <div className=" min-h-screen p-[2vw]" onClick={onClick}>
            <h1 className="text-white text-[3vh]">Matched</h1>
            <div className="flex flex-row gap-[3vw] mt-[3vh]">
                <div className="bg-[#09090D] w-[20%] border-[1px] border-[#1C1C1F] min-h-[60vh] rounded-md">
                    <LeftComponent />
                </div>
                <div className="w-[80%] min-h-[60vh] flex flex-col gap-[4vh]">
                    <div className="bg-[#09090D] border-[1px] border-[#1C1C1F] min-h-[8vh] rounded-md">

                    </div>
                    <div className="bg-[#09090D] border-[1px] border-[#1C1C1F] min-h-[58vh] rounded-md">

                    </div>
                </div>
            </div>
        </div>
    );
}

const LeftComponent = () => {
    return (
        <div className="flex flex-col gap-[2vh]">
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Real Experience Score</h1>
                <div className="h-16 w-16 rounded-full border-[2px] border-[#00AC3A] flex place-items-center">
                    <h1 className="text-white text-center w-full text-[3vh]">A</h1>
                </div>
            </div>
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Real Experience Score</h1>
                <div className="h-16 w-16 rounded-full border-[2px] border-[#00AC3A] flex place-items-center">
                    <h1 className="text-white text-center w-full text-[3vh]">A</h1>
                </div>
            </div>
        </div>
    )
}

export default ResponseLayout;