/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Image } from 'antd';

type UserMessageProps = {
  message?: string;
  userProfile: string | null;
};

const UserMessage = ({ message, userProfile }: UserMessageProps) => {
  return (
    <div className='flex flex-row gap-[1vw] ml-[2vw] items-center'>
      {/* <Image
        className='h-[40px] w-[35px] rounded-full object-cover border'
        src={userProfile || ''}
        preview={false}
      /> */}

      {userProfile ? (
        <Image
          src={userProfile}
          className='h-[35px] w-[35px] rounded-full object-contain'
          preview={false}
        />
      ) : (
        <Avatar size='large' gap={4} className=' bg-[#348888]'>
          U
        </Avatar>
      )}

      <p className='inter-tight text-[1.6vh] w-[60%] text-[#848486] font-medium'>
        {message}
      </p>
    </div>
  );
};

export default UserMessage;
