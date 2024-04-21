/**
 * @author: Egide Ntwali
 * @description: The about page
 * @returns {JSX.Element} The about page
 */

import TeamPageComponent from '@/components/independent/team';
import AboutWelcome from '@/components/layout/about/welcome';
import FooterComponent from '@/components/layout/footer/footer';
import HeaderLayout from '@/components/layout/header';
import Seo from '@/components/Seo';

const AboutPage = () => {
  return (
    <div className=' flex flex-col gap-[5vh]'>
      <Seo templateTitle='About' />
      <HeaderLayout activeTab='about' />
      <AboutWelcome />
      <TeamPageComponent />
      <FooterComponent />
    </div>
  );
};

export default AboutPage;
