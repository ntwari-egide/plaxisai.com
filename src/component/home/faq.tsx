import type { CollapseProps } from 'antd';

import CollapseComponent from '../controls/collapse';
import TextButton from '../controls/text-button';

const FAQComponent = () => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'How do I use Artim AI to find job opportunities?',
      children:
        'You can use Artim AI to find job opportunities by uploading your resume and letting our AI match you with job opportunities that fit your skills and experience.',
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
      className=' relative mt-[10vh] md:mt-[25vh] flex flex-col gap-[1vh] md:gap-[3vh] place-items-center'
    >
      <h1 className='text-[#F28729] inter-tight md:text-[3vh] font-medium text-center'>
        FAQ
      </h1>
      <h1 className='text-white text-[2.5vh] md:text-[5vh] font-bold alliance-2 text-center'>
        Got questions? <br /> Join the community.
      </h1>
      <p className='text-center text-[#BDBDBE] text-[2vh] w-[80vw] md:w-[27vw] ipad-portrait:w-[70vw] m-auto'>
        Our Discord community and staff are here to help! Your feedback will
        help us improve in future versions.
      </p>
      <TextButton text='Join Discord' isContentImportant className='mt-[2vh]' />
      <CollapseComponent items={items} />
    </div>
  );
};

export default FAQComponent;
