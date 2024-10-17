import { Image } from 'antd';

type UserMessageProps = {
  message?: string;
};

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className='flex flex-row gap-[1vw] ml-[2vw]'>
      <Image
        className='h-[40px] w-[35px] rounded-full object-cover border'
        src='https://images.pexels.com/photos/28570314/pexels-photo-28570314/free-photo-of-confident-young-woman-in-glasses-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        preview={false}
      />

      <p className='inter-tight text-[1.6vh] w-[60%] text-[#848486] font-medium'>
        {message}
      </p>
    </div>
  );
};

export default UserMessage;
