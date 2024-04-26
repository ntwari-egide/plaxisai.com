import Link from 'next/link';

export type JobCardProps = {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  link: string;
};

const JobCard = ({
  link,
  company,
  position,
  duration,
  location,
  description,
}: JobCardProps) => {
  return (
    <Link
      href={link}
      target='_blank'
      className='border-[1px] p-[2vh] bg-[#09090D] rounded-md border-[#1C1C1F] cursor-pointer hover:scale-[.98] transition-all flex flex-col gap-[1vh]'
    >
      <h1 className='text-[2vh] text-white font-medium'>{company}</h1>
      <div className='flex alliance-2 flex-row justify-between gap-[2vw]'>
        <p className='text-[#9d9d9e] text-[1.7vh]'>{position}</p>
        <p className='text-[white] text-[1.7vh]'>
          Duration: <span className='text-[#9d9d9e]'>{duration}</span>
        </p>
        <p className='text-[white] text-[1.7vh]'>{location} </p>
      </div>

      <p className='text-[#D5D5D6] alliance-2 text-[2vh]'>{description} </p>
    </Link>
  );
};

export default JobCard;
