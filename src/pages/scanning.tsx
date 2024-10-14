import LoginComponent from '@/component/auths/login';
import HeaderLayout from '@/component/reusable/header';
import ScanningComponent from '@/component/scanning';
import Seo from '@/component/seo';

const LoginPage = () => {
  return (
    <div>
      <Seo templateTitle='Still scanning' />
      <HeaderLayout sticky />
      <ScanningComponent />
    </div>
  );
};

export default LoginPage;
