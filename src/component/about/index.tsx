import { Image } from 'antd';

const AboutLayout = () => {
  return (
    <div className='px-[3vw] w-full my-[6vh] flex flex-col gap-[10vh]'>
      <h1 className='text-white text-[7vh] text-center'>About</h1>
      <p className='text-[#D5D5D6] text-[2.5vh] px-[10vw]'>
        OpenAI is an AI research and deployment company. Our mission is to
        ensure that artificial general intelligence benefits all of humanity. We
        are more interested in making sure that we supply every need of people
        in all social-economic background.
      </p>
      <Image
        src='https://images.pexels.com/photos/6457571/pexels-photo-6457571.jpeg'
        preview={false}
        alt='about'
        className='w-[94vw] h-[80vh] object-cover object-center'
      />
      <h3 className='text-[#D5D5D6] text-[4.5vh] px-[10vw] text-center'>
        We are building safe and beneficial AGI, but will also consider our
        mission fulfilled if our work aids others to achieve this outcome.{' '}
      </h3>
      <p className='text-[#D5D5D6] text-[2.5vh] px-[10vw]'>
        We are governed by a nonprofit and our unique capped-profit model drives
        our commitment to safety. This means that as AI becomes more powerful,
        we can redistribute profits from our work to maximize the social and
        economic benefits of AI technology.
      </p>
      <Image
        src='https://images.pexels.com/photos/236720/pexels-photo-236720.jpeg'
        preview={false}
        alt='about'
        className='w-[94vw] h-[80vh] object-cover object-center'
      />
    </div>
  );
};

export default AboutLayout;
