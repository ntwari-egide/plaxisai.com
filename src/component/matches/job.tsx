import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri';

type JobMatchProps = {
  date?: string;
  matchingPercentage?: string;
  companyName?: string;
  title?: string;
  salary?: string;
};

const JobMatch = ({
  date,
  matchingPercentage,
  companyName,
  title,
  salary,
}: JobMatchProps) => {
  return (
    <Link href='/job-details' target='_blank'>
      <div className='border py-[2vh] rounded-xl px-[1vw] border-[#E6E6E7] w-full flex flex-col'>
        <div className='bg-[#EBF3F3] rounded-md flex flex-col py-[2vh] px-[1vw] gap-[2vh]'>
          <div className='flex flex-row justify-between'>
            <p className='bg-white px-[1.5vw] flex items-center inter-tight text-[1.7vh] font-medium rounded-full'>
              {date}
            </p>
            <p className='whyteInktrap_font text-[3.5vh] font-semibold'>
              {matchingPercentage}
            </p>
          </div>

          <div className='flex flex-col gap-[1vh]'>
            <h1 className='inter-tight text-[1.7vh] font-semibold'>
              {companyName}
            </h1>
            <h1 className='whyteInktrap_font text-[2vh] font-medium'>
              {title}
            </h1>
          </div>

          <div className='flex flex-col gap-[1vh]'>
            <div className='flex flex-row items-center object-center gap-[1vw]'>
              <CheckCircleFilled className='text-[#348888] rounded-full text-[3vh]' />
              <p className='text-[2vh] inter-tight text-[#09090D]'>
                Work Experience
              </p>
            </div>

            <div className='flex flex-row items-center object-center gap-[1vw]'>
              <CheckCircleFilled className='text-[#6A6C72] rounded-full text-[3vh]' />
              <p className='text-[2vh] inter-tight text-[#09090D]'>
                Education & Certifications
              </p>
            </div>

            <div className='flex flex-row items-center object-center gap-[1vw]'>
              <CheckCircleFilled className='text-[#173440] rounded-full text-[3vh]' />
              <p className='text-[2vh] inter-tight text-[#09090D]'>
                Education & Certification
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-between mt-[2vh] w-full'>
          <Button className='inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[3vh] hover:text-[#09090D] font-semibold text-[#09090D] cursor-pointer text-[2vh] hover:scale-[1.02] w-[60%]'>
            Easy Apply
            <RiArrowRightLine className='text-[3vh]' />
          </Button>
          <div className='border-[#E6E6E7] border rounded-full px-[2vw] flex items-center text-[2vh] inter-tight font-medium'>
            {salary}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobMatch;
