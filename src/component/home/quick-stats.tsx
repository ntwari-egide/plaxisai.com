import StatsComponent from '../reusable/stats-component';

const QuickStats = () => {
  return (
    <div
      id='stats'
      className='mt-[20vh] flex flex-col gap-[4vh] px-[2vw] md:px-[3vw]'
    >
      <div>
        <p className='text-[#F28729] inter-tight md:text-[2vh] font-medium'>
          Stats
        </p>
        <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start w-[30vw] mt-4 leading-[5vh]'>
          Quick Success Stats/ Highlights
        </h1>
      </div>
      <div className='grid grid-cols-3 gap-[4vw]'>
        <StatsComponent stat='2000+' description='Students Matched!' />
        <StatsComponent stat='5M+' description='Companies scanned for you!' />
        <StatsComponent stat='95%' description='Accuracy in matching!' />
      </div>
    </div>
  );
};

export default QuickStats;
