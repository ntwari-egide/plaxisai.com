/* eslint-disable jsx-a11y/alt-text */
import logger from '@/lib/logger';
import { CheckCircleFilled } from '@ant-design/icons';
import { Image } from 'antd';
import {
  RiAwardFill,
  RiBookmark2Fill,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';

type CompaniesMatchProps = {
  logoImg: string;
  companyName: string;
  matchingNumber: string;
  title: string;
  subtitle: string;
  matchingDetails: any[];
  companyDomain: string;
};

const CompaniesMatch = ({
  logoImg,
  companyName,
  matchingNumber,
  title,
  matchingDetails,
  subtitle,
  companyDomain
}: CompaniesMatchProps) => {

  return (
    <div className='border border-[#E6E6E7] hover:border-[#348888] cursor-pointer transition-all rounded-xl mt-[3vh] py-[3vh] px-[2vw] flex flex-col gap-[3vh]'>
      <div className='flex flex-row gap-[1vw]  justify-between'>
        <div className='flex flex-row gap-[1.5vw]'>
          { companyDomain && <Image
            src={`https://logo.clearbit.com/${companyDomain}`}
            className='w-[60px] h-[60px] object-contain '
            preview={false}
          />}
          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-[0.4vw]'>
              <h1 className='text-[#09090D] font-semibold text-[1.6vh]'>
                {companyName}
              </h1>
              <RiVerifiedBadgeFill className='text-[#F28729]' />
            </div>
            <h1 className='text-[#173440] font-medium text-[5vh] whyteInktrap_font'>
              {matchingNumber}
            </h1>
          </div>
        </div>
        <RiBookmark2Fill className='text-[4vh] cursor-pointer text-[#09090D]' />
      </div>

      <h1 className='whyteInktrap_font text-[2vh] font-medium'>{title}</h1>

      {
        Object.keys(matchingDetails).map((matchingKey) => (
          <div key={matchingKey} className='flex flex-col gap-[2vh]'>
            <div className='flex flex-row items-center object-center gap-[1vw]'>
              <CheckCircleFilled
                className={`${
                  matchingDetails[matchingKey] > 95
                    ? 'text-[#173440]'
                    : matchingDetails[matchingKey] > 90
                    ? 'text-[#9b9e9e]'
                    : 'text-[#AAE2E2]'
                } rounded-full text-[3vh]`}
              />
              <p className='text-[2vh] inter-tight text-[#09090D]'>
                {matchingKey} ({matchingDetails[matchingKey]})
              </p>
            </div>
          </div>
        ))
      }

      <div className='border-t border-t-[#09090D] border-dashed flex flex-row py-[2vh] gap-[1vw]'>
        <p className='text-[1.4vh] inter-tight text-[#848486] font-medium'>
          {subtitle}
        </p>
        <RiAwardFill className='text-[#F28729]' />
      </div>
    </div>
  );
};

export default CompaniesMatch;
