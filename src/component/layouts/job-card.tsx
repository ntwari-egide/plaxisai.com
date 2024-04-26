const JobCard = () => {
    return (
        <div className="border-[1px] p-[2vh] bg-[#09090D] rounded-md border-[#1C1C1F] cursor-pointer hover:scale-[.98] transition-all flex flex-col gap-[1vh]">
            <h1 className="text-[2vh] text-white font-medium">Google</h1>
            <div className="flex alliance-2 flex-row justify-between">
                <p className="text-[#9d9d9e] text-[1.7vh]">Software Engineer Inter</p>
                <p className="text-[white] text-[1.7vh]">Duration: <span className="text-[#9d9d9e]">3 mon</span></p>
                <p className="text-[white] text-[1.7vh]">
                Seattle, WA </p>
            </div>

            <p className="text-[#D5D5D6] alliance-2 text-[2vh]">Hey you are an excellent match for our team. Please click on this card to apply. </p>
        </div>
    );
}

export default JobCard;