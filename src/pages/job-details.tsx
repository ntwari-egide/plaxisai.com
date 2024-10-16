import JobDetailsLayout from '@/component/job-details';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

const JobDetailsPage = () => {
  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <JobDetailsLayout />
      </div>
    </div>
  );
};

export default JobDetailsPage;
