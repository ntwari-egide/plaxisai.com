import SignupComponent from '@/component/auths/signup';
import Seo from '@/component/seo';

const SignupPage = () => {
  return (
    <div>
      <Seo templateTitle='Login' />
      <SignupComponent/>
    </div>
  );
};

export default SignupPage;
