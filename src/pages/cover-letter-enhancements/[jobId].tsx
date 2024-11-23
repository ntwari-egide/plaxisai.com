import CoverLetterEnhancementLayout from '@/component/cover-letter-enhancement';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';
import { useRouter } from 'next/router';

const CoverLetterEnhancement = () => {
  const router = useRouter();

  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout showNotification={false} sticky />
        <CoverLetterEnhancementLayout jobId={router.query.jobId}/>
      </div>
    </div>
  );
};

export default CoverLetterEnhancement;
