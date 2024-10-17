import ResumeEnhancementLayout from '@/component/resume-enhancement';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

const JobDetailsPage = () => {
  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <ResumeEnhancementLayout />
      </div>
    </div>
  );
};

export default JobDetailsPage;
