import HeaderLayout from '@/component/reusable/header';
import ScanningComponent from '@/component/scanning';
import Seo from '@/component/seo';

const LoginPage = () => {
  return (
    <>
      <Seo templateTitle='Still scanning...' />
      <div>
        <HeaderLayout sticky />
        <ScanningComponent />
        {/* <FooterComponent /> */}
      </div>
    </>
  );
};

export default LoginPage;
