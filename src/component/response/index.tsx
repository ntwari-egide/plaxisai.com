import { Modal, Slider } from "antd";
import { useState } from "react";

type ResponseLayoutProps = {
    onClick?: () => void;
}

const ResponseLayout = ({ onClick}: ResponseLayoutProps) => {

    return (
        <div className="relative min-h-screen p-[2vw]" onClick={onClick}>
            <h1 className="text-white text-[3vh]">Matched</h1>
            <div className="flex flex-row gap-[3vw] mt-[3vh]">
                <div className="bg-[#09090D] sticky top-0 w-[20%] border-[1px] border-[#1C1C1F] min-h-[60vh] rounded-md">
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
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Matching Companies</h1>
                <div className="h-16 w-20 rounded-full border-[2px] border-[#00AC3A] flex place-items-center">
                    <h1 className="text-white text-center w-full text-[3vh]">200+</h1>
                </div>
            </div>
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Experience Score</h1>
                <div className="h-16 w-16 rounded-full border-[2px] border-[#F28729] flex place-items-center">
                    <h1 className="text-white text-center w-full text-[3vh]">B</h1>
                </div>
            </div>
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Experience Score</h1>
                <span className="text-[#00AC3A] text-[2.3vh]">80</span>
                <Slider defaultValue={80} disabled />
            </div>
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh] border-b-[1px] border-[#1C1C1F]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Experience Score</h1>
                <span className="text-[#00AC3A] text-[2.3vh]">80</span>
                <Slider defaultValue={80} disabled />
            </div>
            <div className="w-full px-[2vh] py-[2vh] flex flex-col gap-[2vh]">
                <h1 className="text-[#9D9D9E] alliance-2 text-[1.7vh]">Experience Score</h1>
                <span className="text-[#00AC3A] text-[2.3vh]">80</span>
                <Slider defaultValue={80} disabled />
            </div>
        </div>
    )
}

export default ResponseLayout;