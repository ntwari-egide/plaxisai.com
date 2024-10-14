type StatsComponentProps = {
    stat: string;
    description: string
}

const StatsComponent = ({
    stat,
    description
} : StatsComponentProps) => {
    return (
        <div className="border-[1px] rounded-xl border-[#09090D] flex flex-col gap-[5vh] h-[40vh] justify-center items-center">
            <div className="text-center">
                <h1 className="text-[7vh] whyteInktrap_font font-medium text-[#173440]">{stat}</h1>
                <p className="inter-tight font-medium text-[1.7vh] text-[#09090D]">{description}</p>
            </div>
        </div>
    )
}

export default StatsComponent;