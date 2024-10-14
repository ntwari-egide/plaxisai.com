import type { CollapseProps } from 'antd';
import Link from 'next/link';

import CollapseComponent from '../controls/collapse';
import GradientButton from '../controls/gradient-button';

const FAQComponent = () => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'How do I use Plaxis AI to find job opportunities?',
      children:
        'You can use Plaxis AI to find job opportunities by uploading your resume and letting our AI match you with job opportunities that fit your skills and experience.',
    },
    {
      key: '2',
      label: 'What happens to my resume after I upload it?',
      children:
        'Your resume is securely uploaded into our system and is only used to match you with job opportunities. We do not share your resume with any third parties.',
    },
    {
      key: '3',
      label:
        'Can I get feedback on why I was matched with specific job opportunities?',
      children:
        'While our system does not provide specific feedback for individual matches, it uses a sophisticated algorithm to analyze the skills, experiences, and educational background provided in your resume. It then compares these aspects to the requirements of available job positions to find the best matches. For more detailed insights, you may want to review the job descriptions and required qualifications of your matched opportunities.',
    },
  ];

  return (
    <div
      id='faq'
      className=' relative mt-[10vh] md:mt-[25vh] flex flex-col gap-[1vh] md:gap-[4vh] place-items-center'
    >
      <div className='flex flex-col place-items-center'>
        <h1 className='text-[#F28729] inter-tight md:text-[2vh] font-medium'>
          FAQ
        </h1>
        <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center w-[30vw] mt-4 leading-[5vh]'>
          Got questions? <br /> Join the community.
        </h1>
      </div>
      <p className='text-center text-[#09090D] md:w-[27vw] ipad-portrait:w-[70vw] m-auto w-[20vw] inter-tight  font-medium text-[1.7vh]'>
        Our Discord community and staff are here to help! Your feedback will
        help us improve in future versions.
      </p>
      <Link href='https://discord.gg/hFgPf7xfrQ' target='_blank'>
        <GradientButton
          href='#home'
          text='Join Groupme'
          className='mt-[1vh] text-white bg-[#348888]'
          theme='colorfull'
          backgroundColor='#348888'
        />
      </Link>
      <CollapseComponent items={items} />
    </div>
  );
};

export default FAQComponent;
