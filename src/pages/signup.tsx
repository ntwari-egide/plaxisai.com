import GradientButton from "@/component/controls/gradient-button";
import { Button, Input } from "antd";
import { RiAppleFill, RiArrowRightLine, RiGoogleFill, RiLinkedinFill } from "react-icons/ri";

const SignupPage = () => {
    return (
        <div className="flex flex-col justify-center items-center object-center mt-[10vh]">
            <div className="border-[1px] border-[#E6E6E7] rounded-xl w-[35vw] flex flex-col py-[4vh] gap-[3vh]">
                <div className="flex flex-col object-center items-center justify-center">
                    <h1 className="text-[#000000] md:text-[2.5vh] font-bold whyteInktrap_font   md:text-start leading-[5vh] text-center">Welcome to Plaxis AI</h1>
                    <p className='w-[20vw] inter-tight  font-normal text-[1.7vh] text-center'>Unlock your career: Just upload your resume
                    </p>
                </div>

                <div className="mt-[2vh] gap-[2vh] flex flex-col items-center">
                    <div className="flex flex-row gap-[2vw] w-[20vw] border border-[#E6E6E7] py-[1vh] cursor-pointer hover:scale-[1.02] transition-all px-[2vw] rounded-md justify-center items-center">
                        <RiGoogleFill className="text-[2vh]" />
                        <p className=" inter-tight  font-medium text-[1.7vh]">Continue with Google</p>
                    </div>

                    <div className="flex flex-row gap-[2vw] w-[20vw] border border-[#E6E6E7] py-[1vh] cursor-pointer hover:scale-[1.02] transition-all px-[2vw] rounded-md justify-center items-center">
                        <RiLinkedinFill className="text-[2vh]" />
                        <p className=" inter-tight  font-medium text-[1.7vh]">Continue with LinkedIn</p>
                    </div>

                    <div className="flex flex-row gap-[2vw] w-[20vw] border border-[#E6E6E7] py-[1vh] cursor-pointer hover:scale-[1.02] transition-all px-[2vw] rounded-md justify-center items-center">
                        <RiAppleFill className="text-[2vh]" />
                        <p className=" inter-tight  font-medium text-[1.7vh]">Continue with Apple</p>
                    </div>
                </div>
                <div className="mt-[2vh] flex flex-col items-center ">
                 <div className="w-[20vw] flex-col flex gap-[2vh]">
                    <p className="inter-tight  font-semibold text-[1.7vh] text-start">Email</p>
                    <p className="inter-tight  font-normal text-[1.7vh] text-start">If you have school email, please use it</p>

                    <Input type="email" placeholder="Enter your email address" className="outline-none border-[#E6E6E7] border rounded-md inter-tight placeholder:text-[#848486] placeholder:font-semibold text-[2vh]" />

                    <Button className="inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[3vh] hover:text-[#09090D] font-semibold text-[#09090D] cursor-pointer hover:scale-[1.02]">
                        Create Account
                        <RiArrowRightLine
                        className={'text-[3vh]'}
                    />
                    </Button>
                 </div>
                </div>
            </div>
            <p className="mt-[3vh] inter-tight text-[#848486] w-[20vw] text-[1.7vh] text-center font-medium">By clicking “Create Account” above, you acknowledge that you have read and understood, and agree to Plaxis AI’s <br />
            <span className="text-[#09090D] cursor-pointer hover:underline"> Terms and Privacy.</span></p>
        </div>
    )
}

export default SignupPage;