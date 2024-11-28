import LoginComponent from '@/component/auths/login';
import Seo from '@/component/seo';

const LoginPage = () => {
  return (
    <div>
      <Seo templateTitle='Login' />
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
