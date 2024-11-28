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
        'Hey there, fellow students! 🌟 The semester’s in full swing, and we all know what that means: the inevitable internship panic. Applications are open, competition is fierce, and landing just <strong>one</strong> interview feels harder than ever. 😩',
    },
    {
      storyImg: StoryImg1,
      content:
        'As college students, we’ve all been there—endlessly tweaking our resumes for each job posting, trying to stand out. You spend hours with AI tools, but they just keep adding content without giving you any control over what goes in. The result? A bloated, unrealistic resume that doesn’t feel like <strong>you</strong>. 😵‍💫',
    },
    {
      storyImg: StoryImg2,
      content:
        'We knew there had to be a better way. That’s why we built <strong>Plaxis AI</strong>—to put <strong>YOU</strong> back in control. Our <strong>user-prompted AI enhancement tool</strong> lets you decide how your resume and cover letter are improved, ensuring every edit stays true to your voice and experience. No more generic, one-size-fits-all changes—just tailored enhancements that work for <strong>you</strong>. 💡',
    },
    {
      storyImg: StoryImg3,
      content:
        'But we didn’t stop there. Imagine uploading your resume <strong>once</strong> and letting our AI take over. It matches your skills to the perfect companies by scanning through <strong>millions of profiles</strong> and opportunities. Plus, we take it a step further by suggesting <strong>referrals from alumni or professionals</strong> who work at the same company you’re applying to—whether they attended your school or currently hold the position you’re aiming for. 🌐✨',
    },
    {
      storyImg: StoryImg4,
      content:
        'Our advanced query system also pulls real-time job listings, ensuring you’re always up-to-date on the latest opportunities. Whether you’re a student looking for internships or a seasoned professional searching for the next big role, Plaxis AI has you covered. 🗺️💎 We match you with roles that align with your skills and career goals. No experience? No problem! We recommend internships tailored to your profile—building your future, one step at a time. 🚀',
    },
    {
      storyImg: StoryImg5,
      content:
        'Gone are the days of repetitive resume edits, unrealistic content, and endless frustration. With <strong>Plaxis AI</strong>, your job search becomes smarter, faster, and far less stressful. Think of us as your career treasure map, guiding you to opportunities that truly fit—plus connecting you with the people who can help you get there. Let’s uncover the treasures of your future—together. 🌟',
    },
  ];

  return (
    <div className='md:px-[15vw] px-[6vw] w-full mt-[5vh] md:mt-[20vh] flex flex-col ipad-portrait:px-[5vw] ipad-landscape:px-[5vw]'>
      <div>
        <p className='text-[#F28729] inter-tight md:text-[2vh] font-medium'>
          About Us
        </p>
        <h1 className='text-[#000000] text-[4.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-start md:text-start md:w-[25vw] mt-4 leading-[5vh]'>
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
        <h1 className='text-[#000000] text-[4.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start md:w-[35vw] mt-4 leading-[5vh] ipad-portrait:w-full'>
          Ready to find your perfect match?
        </h1>
        <div className='md:grid grid-cols-2 gap-[10vw] object-center items-center ipad-portrait:flex ipad-portrait:flex-col-reverse flex flex-col-reverse justify-center'>
          <div className=' flex flex-row gap-[3vw]'>
            <GradientButton
              className='border-[#348888] text-[#348888]'
              text='Get Started'
              href='/signup'
            />
            <GradientButton
              className='border-[white] text-[#09090D]'
              text='See How It Works'
              href='/signup'
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
    <div className=' md:grid flex flex-col grid-cols-2 gap-[10vw] ipad-portrait:flex ipad-portrait:flex-col'>
      <div className=''>
        <Image
          src={storyImg}
          preview={false}
          className=' h-auto object-cover'
        />
      </div>

      <p
        className='inter-tight text-[1.7vh]'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default AboutLayout;
