/**
 * @author: Egide Ntwali
 * @description: The projects page
 * @returns {JSX.Element} The projects page
 */

import FooterComponent from '@/components/layout/footer/footer';
import HeaderLayout from '@/components/layout/header';
import ProjectsWelcomePage from '@/components/layout/projects';
import Seo from '@/components/Seo';

const ProjectsPage = () => {
  return (
    <div>
      <Seo title='Projects' />
      <HeaderLayout activeTab='projects' />
      <ProjectsWelcomePage />
      <FooterComponent />
    </div>
  );
};

export default ProjectsPage;
