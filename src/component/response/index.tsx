/* eslint-disable react-hooks/exhaustive-deps */

type ResponseLayoutProps = {
  onClick?: () => void;
};

const ResponseLayout = ({ onClick }: ResponseLayoutProps) => {
  
  return (
    <div className='px-[3vw] mt-[3vh] ' onClick={onClick}>
      <div className="flex flex-row items-center">
        <div className="flex flex-row gap-[4vw] bg-[#348888] px-[1.4vw] rounded-full py-[1vh]">
          <h1 className="whyteInktrap_font text-white  text-[1.8vh] leading-[3.3vh] font-medium">Matching Results</h1>
          <h1 className="text-[#D6E7E7] inter-tight text-[1.8vh] font-medium">3 companies found</h1>
        </div>
      </div>
    </div>
  );
};

export default ResponseLayout;
