import GradientButton from "../controls/gradient-button";

const CallToActionComponent = () => {
    return (
        <div className="call-to-action relative mt-[20vh] flex flex-col gap-[6vh] place-items-center">
            <h1 className="text-white text-[8vh] font-bold text-center w-[50vw] m-auto alliance-2">Your next great job is just one upload away.</h1>
            <GradientButton size="large" text="Get Started" className="mt-[5vh]" />
        </div>
    );
}

export default CallToActionComponent;