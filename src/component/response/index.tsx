/* eslint-disable react-hooks/exhaustive-deps */

import TagComponent from "../reusable/tags";

type ResponseLayoutProps = {
  onClick?: () => void;
};

const ResponseLayout = ({ onClick }: ResponseLayoutProps) => {
  
  return (
    <div className='px-[3vw] mt-[3vh] ' onClick={onClick}>
      <div className="flex flex-row gap-[3vw] items-center">
      <TagComponent title="Matching Results" description="3 companies found" classname="bg-[#348888]" />
      <TagComponent title="Visa Sponsorship" description="3 matches sponsor visa" classname="bg-[#09090D]" />
      <TagComponent title="Hires from Lehigh" description="10+ employees from Lehigh University" classname="bg-[#173440]" />
      </div>
    </div>
  );
};

export default ResponseLayout;
