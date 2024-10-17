import PlaxisAITag from '../job-details/ai-tag';

type PlaxisAIMessageProps = {
  message?: string;
};

const PlaxisAIMessage = ({ message }: PlaxisAIMessageProps) => {
  return (
    <div className='flex flex-col bg-[#FEF3EA] gap-[2vh] px-[2vh] py-[2vh] rounded-lg'>
      <PlaxisAITag size='small' />
      <p className='inter-tight text-[1.6vh] font-medium'> {message} </p>
    </div>
  );
};

export default PlaxisAIMessage;
