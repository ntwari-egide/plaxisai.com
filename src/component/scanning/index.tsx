import { Steps } from 'antd';

const ScanningComponent = () => {
  return (
    <div className='px-[3vw] h-[80vh] flex flex-col md:flex-row w-full'>
      <div className='flex flex-col items-center md:w-[65%]'>
        <div className=' flex flex-col gap-[4vh] mt-[10vh]'>
          <h1 className='text-[7vh] whyteInktrap_font font-semibold'>
            Still scanning...
          </h1>
          <p className='inter-tight  font-medium text-[1.7vh]'>
            We’re doing the hard work for you—your job search just got a whole
            lot easier!
          </p>
          <p className='inter-tight  font-semibold text-[1.7vh] italic'>
            Hold tight, 30 secs
          </p>
        </div>
      </div>
      <div className='border-l border-l-[#DADADC] pt-[10vh] pl-[5vh] md:block hidden'>
        <Steps
          direction='vertical'
          current={1}
          className='alliance-2'
          items={[
            {
              title: 'Extracting Data',
              description:
                'Your resume is meticulously analyzed by our cutting-edge algorithm, ensuring no detail is missed.',
            },
            {
              title: 'Matching Profiles',
              description:
                'Our intelligent system scans over 5 million employers, pinpointing the perfect match for you in mere seconds.',
            },
            {
              title: 'Revealing Best Matches, Referrals & Enhancements',
              description:
                'Instantly access a curated list of top-matching companies and positions.',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ScanningComponent;
