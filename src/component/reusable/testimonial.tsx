/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
import { Image } from 'antd';
import Link from 'next/link';

type TestimonialProps = {
  userProfileImg?: string;
  userName?: string;
  mBody?: string;
  university?: string;
  uniURL: string;
  major?: string;
};

const Testimonial = ({
  userProfileImg,
  userName,
  mBody,
  major,
  university,
  uniURL,
}: TestimonialProps) => {
  return (
    <div className='border-[1px] z-[80] border-[#09090D] rounded-xl px-[1.4vw]'>
      <div className='flex flex-row gap-[1vw] border-b-[1px] cursor-pointer border-b-[#808080] border-dashed py-[2vh]'>
        <Image
          src={userProfileImg}
          preview={false}
          className='rounded-full object-cover h-[50px] w-[50px]'
        />

        <div className=' text-[#09090D]'>
          <h1 className=' text-[2vh] whyteInktrap_font font-medium'>
            {userName}
          </h1>
          <h1 className=' text-[1.6vh] inter-tight font-medium text-[#333333]'>
            {major}{' '}
            <Link
              href={uniURL}
              target='_blank'
              className='text-[#808080] cursor-pointer'
            >
              @{university}
            </Link>
          </h1>
        </div>
      </div>
      <p className='inter-tight font-medium text-[1.7vh] text-[#09090D] py-[2vh]'>
        {mBody}
      </p>
    </div>
  );
};

export default Testimonial;
