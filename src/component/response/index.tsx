/* eslint-disable react-hooks/exhaustive-deps */

import FiltersComponent from './filter';
import CompaniesMatch from '../matches/companies';
import TagComponent from '../reusable/tags';

type ResponseLayoutProps = {
  onClick?: () => void;
};

const ResponseLayout = ({ onClick }: ResponseLayoutProps) => {
  return (
    <div className='px-[3vw] mt-[3vh] ' onClick={onClick}>
      <div className='flex flex-row gap-[3vw] items-center'>
        <TagComponent
          title='Matching Results'
          description='3 companies found'
          classname='bg-[#348888]'
        />
        <TagComponent
          title='Visa Sponsorship'
          description='3 matches sponsor visa'
          classname='bg-[#09090D]'
        />
        <TagComponent
          title='Hires from Lehigh'
          description='10+ employees from Lehigh University'
          classname='bg-[#173440]'
        />
      </div>
      <div className='grid grid-cols-3 gap-[3vw]'>
        <CompaniesMatch
          title='Software Engineering Intern'
          companyName='Apple'
          subtitle='20 jobs available from this company'
          matchingNumber='96.7%'
          logoImg='https://logodownload.org/wp-content/uploads/2013/12/apple-logo-16.png'
        />
        <CompaniesMatch
          title='Software Engineering Intern'
          companyName='Google'
          subtitle='20 jobs available from this company'
          matchingNumber='95.7%'
          logoImg='https://loodibee.com/wp-content/uploads/Google-Symbol.png'
        />
        <CompaniesMatch
          title='Software Engineering Intern'
          companyName='Meta'
          subtitle='20 jobs available from this company'
          matchingNumber='94.5%'
          logoImg='https://www.cdnlogo.com/logos/m/59/meta.svg'
        />
      </div>

      <div className='mt-[5vh]'>
        <div className='flex flex-row justify-between'>
          <h1 className='whyteInktrap_font text-[4.5vh] font-semibold'>
            All matched jobs
          </h1>
          <div>
            <TagComponent
              title='Matching Results'
              description='40 jobs found'
              classname='bg-[#348888]'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='w-[15%]'>
          <FiltersComponent />
        </div>
      </div>
    </div>
  );
};

export default ResponseLayout;
