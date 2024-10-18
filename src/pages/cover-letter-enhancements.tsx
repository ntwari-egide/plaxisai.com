import CoverLetterEnhancementLayout from '@/component/cover-letter-enhancement';
import HeaderLayout from '@/component/reusable/header';
import Seo from '@/component/seo';

const CoverLetterEnhancement = () => {
  return (
    <div>
      <Seo templateTitle='Home' />
      <div className='welcome-bg flex justify-between flex-col'>
        <HeaderLayout sticky />
        <CoverLetterEnhancementLayout />
      </div>
    </div>
  );
};

export default CoverLetterEnhancement;
