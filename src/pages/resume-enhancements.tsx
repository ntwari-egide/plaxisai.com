import ResumeEnhancementLayout from '@/component/resume-enhancement';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

const ResumeEnhancement = () => {
  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky showNotification/>
        <ResumeEnhancementLayout />
      </div>
    </div>
  );
};

export default ResumeEnhancement;
