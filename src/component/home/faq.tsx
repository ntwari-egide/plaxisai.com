import type { CollapseProps } from 'antd';

import CollapseComponent from '../controls/collapse';
import GradientButton from '../controls/gradient-button';

const FAQComponent = () => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'How does Plaxis AI help with job applications?',
      children:
        'Plaxis AI simplifies your job search by analyzing your resume and instantly matching you with companies and job openings that align with your skills, experience, and career goals. Whether you’re a student looking for internships or a professional seeking new opportunities, our AI ensures that your matches are tailored to your unique profile. Additionally, we provide personalized referrals, connecting you with alumni or professionals in your target companies who can boost your chances of success.',
    },
    {
      key: '2',
      label:
        'What makes Plaxis AI’s resume and cover letter enhancements unique?',
      children:
        'Unlike other tools that over-edit and make resumes look unrealistic, Plaxis AI offers a user-prompted enhancement tool. You have full control over how your resume and cover letter are updated, ensuring they reflect your voice and true experience. This first-of-its-kind feature empowers you to craft application materials that stand out while staying authentic.',
    },
    {
      key: '3',
      label: 'What happens to my resume after I upload it?',
      children:
        'Your resume is securely uploaded and used exclusively to match you with job opportunities. We never share your information with third parties. Additionally, Plaxis AI provides insights into why you were matched with specific roles, helping you understand how your skills align with job requirements.',
    },
    {
      key: '4',
      label: 'Can Plaxis AI help students with no work experience?',
      children:
        'Absolutely! Plaxis AI is designed to support students at all stages of their career journey. For those without experience, we recommend internships tailored to your skills and academic background. Our platform ensures that you’re matched with opportunities that act as stepping stones to a successful career.',
    },
    {
      key: '5',
      label: 'How does Plaxis AI keep job listings updated?',
      children:
        'Our platform pulls job listings in real-time, ensuring you have access to the latest openings as soon as they become available. With over 5 million companies in our database, Plaxis AI helps you stay ahead of the competition by surfacing opportunities that match your profile instantly.',
    },
    {
      key: '6',
      label: 'Is my data secure with Plaxis AI?',
      children:
        'Yes, your data security is our top priority. We use encrypted systems to store and process your information, ensuring that your resume and personal details are fully protected. Your data is never shared or sold to third parties, so you can trust Plaxis AI with your career journey.',
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
      <GradientButton
        href='https://groupme.com/join_group/104708974/aQ5ELuOz'
        text='Join Groupme'
        className='mt-[1vh] text-white bg-[#348888]'
        theme='colorfull'
        backgroundColor='#348888'
      />
      <CollapseComponent items={items} />
    </div>
  );
};

export default FAQComponent;
