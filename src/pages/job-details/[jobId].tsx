import { useRouter } from 'next/router';

import JobDetailsLayout from '@/component/job-details';
import FooterComponent from '@/component/layouts/footer';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

const JobDetailsPage = () => {
  const router = useRouter();

  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <JobDetailsLayout jobId={router.query.jobId} />
        <FooterComponent />
      </div>
    </div>
  );
};

export default JobDetailsPage;
