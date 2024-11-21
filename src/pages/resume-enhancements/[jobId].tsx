import ResumeEnhancementLayout from '@/component/resume-enhancement';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';
import { useRouter } from 'next/router';

const ResumeEnhancement = () => {
  const router = useRouter();

  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky showNotification={false} />
        <ResumeEnhancementLayout jobId={router.query.jobId} />
      </div>
    </div>
  );
};

export default ResumeEnhancement;
