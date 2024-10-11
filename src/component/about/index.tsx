import { Image } from 'antd';

const AboutLayout = () => {
  return (
    <div className='px-[3vw] w-full mt-[6vh] flex flex-col gap-[10vh]'>
      <h1 className='text-[#000000] text-[7vh] text-center'>About</h1>
      <p className='text-[#D5D5D6] text-[2.5vh] px-[10vw]'>
        In today's competitive job market, students often find themselves
        endlessly editing their resumes to fit different job applications.
        Imagine needing to apply to over 100 jobs—does that mean 100 edits? Not
        with Plaxis AI. We understand the struggle. That's why we created a
        platform that revolutionizes the job application process. Plaxis AI
        helps you find companies that match your current resume, saving you
        countless hours of edits. Simply upload your resume, and with a few
        clicks, you're ready to send.
      </p>
      <Image
        src='https://images.pexels.com/photos/6457571/pexels-photo-6457571.jpeg'
        preview={false}
        alt='about'
        className='w-[94vw] h-[80vh] object-cover object-center'
      />
      <h3 className='text-[white] text-[4.5vh] px-[10vw] text-center'>
        Revolutionizing Job Matching: Helping You Find the Perfect Fit
        Effortlessly, and Empowering the Future Workforce to Achieve Their
        Dreams.
      </h3>
      <p className='text-[#D5D5D6] text-[2.5vh] px-[10vw]'>
        At Plaxis AI, our mission is to streamline your job search and help you
        find the perfect match effortlessly. We aim to transform the way
        students and professionals navigate their careers by providing a
        seamless and efficient solution to resume and job matching.
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
