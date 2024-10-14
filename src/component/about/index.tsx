import { Image } from 'antd';

import GradientButton from '../controls/gradient-button';
import StoryImg0 from '../../../public/images/image.png';
import StoryImg1 from '../../../public/images/image-1.png';
import StoryImg2 from '../../../public/images/image-2.png';
import StoryImg3 from '../../../public/images/image-3.png';
import StoryImg4 from '../../../public/images/image-4.png';
import StoryImg5 from '../../../public/images/image-5.png';

const AboutLayout = () => {
  const storyContent = [
    {
      storyImg: StoryImg0,
      content:
        'Hey there, fellow dreamers! 🌟 If you’re reading this, you’re likely navigating the wild world of job hunting—like a brave explorer searching for hidden treasures in a sea of applications.',
    },
    {
      storyImg: StoryImg1,
      content:
        'As a college student, I know firsthand how challenging it can be to land just one interview these days. You’ve probably experienced the struggle of enhancing your resume for a specific job, only to find yourself making those edits over and over—sometimes up to 100 times! 😵‍💫',
    },
    {
      storyImg: StoryImg2,
      content:
        'But what if I told you that there’s a magical platform where you can upload your resume once and instantly connect with companies eager to find you? No more tedious tweaking!',
    },
    {
      storyImg: StoryImg3,
      content:
        'That’s where Plaxis AI comes in! Imagine a world where artificial intelligence works tirelessly behind the scenes, scanning over 5 million companies to find the perfect matches for your resume. 🌐✨',
    },
    {
      storyImg: StoryImg4,
      content:
        'Our powerful query system pulls job listings in real-time, so you’ll be the first to discover new opportunities as soon as they arise. Think of us as your personal treasure map, guiding you to the gems that fit your skills and aspirations. 🗺️💎 We match jobs based on your unique abilities and the interests of the companies. For students without experience, we recommend internships that align with your profile—like finding the perfect stepping stone to launch your career. For seasoned adventurers, we connect you with companies actively seeking talent like yours, and jobs waiting to be explored in your area. 🌍🚀',
    },

    {
      storyImg: StoryImg5,
      content:
        'So, if you’re ready to leave behind the exhausting cycle of repetitive edits and embrace a smarter way to navigate your job search, Plaxis AI is your trusty sidekick! Together, let’s uncover the treasures of your career path.',
    },
  ];

  return (
    <div className='px-[15vw] w-full mt-[20vh] flex flex-col'>
      <div>
        <p className='text-[#F28729] inter-tight md:text-[2vh] font-medium'>
          About Us
        </p>
        <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start w-[25vw] mt-4 leading-[5vh]'>
          Story Time
        </h1>
      </div>

      <div className='flex flex-col mt-[10vh] gap-[10vh]'>
        {storyContent.map((story, key) => (
          <StoryBoard
            key={key}
            storyImg={story.storyImg.src}
            content={story.content}
          />
        ))}
      </div>

      <div className='mt-[10vh] flex flex-col gap-[4vh] border-t-[1px] border-t-[#E6E6E7] pt-[4vh]'>
        <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start w-[35vw] mt-4 leading-[5vh]'>
          Ready to find your perfect match?
        </h1>
        <div className='grid grid-cols-2 gap-[10vw] object-center items-center justify-center'>
          <div className=' flex flex-row gap-[3vw]'>
            <GradientButton
              className='border-[#348888] text-[#348888]'
              text='Get Started'
              href='/#home'
            />
            <GradientButton
              className='border-[white] text-[#09090D]'
              text='See How It Works'
              href='/#home'
            />
          </div>
          <p className='inter-tight text-[1.7vh]'>
            So, if you’re ready to leave behind the exhausting cycle of
            repetitive edits and embrace a smarter way to navigate your job
            search, Plaxis AI is your trusty sidekick! Together, let’s uncover
            the treasures of your career path.
          </p>
        </div>
      </div>
    </div>
  );
};

type StoryBoardProps = {
  storyImg: string;
  content: string;
};

const StoryBoard = ({ storyImg, content }: StoryBoardProps) => {
  return (
    <div className=' grid grid-cols-2 gap-[10vw]'>
      <div className=''>
        <Image
          src={storyImg}
          preview={false}
          className=' h-auto object-cover'
        />
      </div>

      <p className='inter-tight text-[1.7vh]'>{content}</p>
    </div>
  );
};

export default AboutLayout;
