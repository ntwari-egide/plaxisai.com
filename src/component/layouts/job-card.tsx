import Link from 'next/link';

export type JobCardProps = {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  link: string;
  salary?: string;
  postedDate?: string;
};

const JobCard = ({
  link,
  company,
  position,
  duration,
  location,
  description,
  salary,
  postedDate,
}: JobCardProps) => {

  const truncateText = (text: string, maxWords: number): string => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  
  return (
    <Link
      href={link}
      target='_blank'
      className='border-[1px] p-[2vh] bg-[#09090D] rounded-md border-[#1C1C1F] cursor-pointer hover:scale-[.98] transition-all flex flex-col gap-[1vh]'
    >
      <h1 className='text-[2vh] text-[#9d9d9e] font-medium'>{company}</h1>
      <div className='flex alliance-2 flex-row justify-between gap-[2vw]'>
        <p className='text-[white] font-medium text-[1.7vh]'>{position}</p>
        <p className='text-[white] text-[1.7vh]'>
          Duration: <span className='text-[#9d9d9e]'>{duration}</span>
        </p>
        <p className='text-[white] text-[1.7vh]'>{location} </p>
      </div>
      <div className='flex alliance-2 flex-row justify-between gap-[2vw]'>
        { salary && <p className='text-[white] text-[1.7vh]'>
          Salary : <span className='text-[#9d9d9e]'>{salary}</span>
        </p>}
        { postedDate && <p className='text-[white] text-[1.7vh]'>
          Posted At : <span className='text-[#9d9d9e]'>{postedDate}</span>
        </p>}
      </div>

      <p className='text-[#d5d5d6e6] alliance-2 text-[2vh]'>{truncateText(description, 30)} </p>
    </Link>
  );
};

export default JobCard;
