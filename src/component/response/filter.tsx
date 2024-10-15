import Checkbox from 'antd/es/checkbox/Checkbox';

const FiltersComponent = () => {
  return (
    <div className='flex flex-col gap-[3vh]'>
      <h1 className='inter-tight text-[2.4vh] font-semibold text-[#09090d]'>
        Filters
      </h1>

      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Company
        </h1>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Apple (20)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Microsoft (10)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Meta (12)
        </Checkbox>
      </div>

      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Work Schedule
        </h1>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Full time (35)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Part time (19)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Internship (4)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Research (5)
        </Checkbox>
      </div>

      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Work Settings
        </h1>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Remote (2)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Onsite (40)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Hybrid (10)
        </Checkbox>
      </div>

      <div className='flex flex-col gap-[1vh]'>
        <h1 className='inter-tight text-[2vh] font-semibold text-[#8F8F8F]'>
          Season
        </h1>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Summer (40)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Winter (40)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Spring (10)
        </Checkbox>
        <Checkbox className='inter-tight text-[2vh] font-medium text-[#09090d]'>
          Whole year (4)
        </Checkbox>
      </div>
    </div>
  );
};

export default FiltersComponent;
