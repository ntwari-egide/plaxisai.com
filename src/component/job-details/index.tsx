/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Image, Select } from 'antd';
import {
  RiArrowRightLine,
  RiGroupLine,
  RiMapPinLine,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';

import PlaxisAITag from './ai-tag';
import JobMatch from '../matches/job';
import { jobMatches } from '../response/job-matches-component';
import AIDarkImg from '../../../public/images/ai-icon.png';
import AILightImg from '../../../public/images/ai-icon-white.png';

const JobDetailsLayout = () => {
  return (
    <div className='md:px-[3vw] mt-[4vh]'>
      <div className='flex flex-row gap-[4vw]'>
        <div className='w-[65%] flex flex-col gap-[3vh]'>
          {/* job details */}

          <div className='flex flex-row justify-between'>
            <h1 className='text-[4.5vh] font-semibold whyteInktrap_font'>
              Software Engineering Intern
            </h1>
            <Button className='inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[2.3vh] hover:text-[#09090D] font-semibold text-[#09090D] cursor-pointer text-[1.4vh] hover:scale-[1.02] w-[15%]'>
              Easy Apply
              <RiArrowRightLine className='text-[3vh] -rotate-45' />
            </Button>
          </div>

          <div className='flex flex-row'>
            <div className='flex flex-row gap-[1.5vw]'>
              <Image
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86kDWkquaiBSCj1nHaJTsCTNlVPH0GR4H2w&s'
                }
                className='w-[60px] h-[60px] object-contain '
                preview={false}
              />
              <div className='flex flex-col justify-between'>
                <div className='flex flex-row gap-[1vw]'>
                  <div className='flex flex-row items-center gap-[0.4vw]'>
                    <h1 className='text-[#09090D] font-semibold text-[1.6vh]'>
                      Meta
                    </h1>
                    <RiVerifiedBadgeFill className='text-[#F28729]' />
                  </div>
                  <div className='flex flex-row gap-[0.4vw] cursor-pointer hover:underline'>
                    <RiMapPinLine className='text-[#848486] text-[1.7vh]' />
                    <h1 className='text-[#848486] font-semibold text-[1.6vh]'>
                      Menlo Park, CA
                    </h1>
                  </div>
                </div>

                <div className='flex flex-row gap-[1vw]'>
                  <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                    Full-time
                  </h1>
                  <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                    Summer
                  </h1>
                  <h1 className='text-[#313131] bg-[#F3F3F3] px-[1vw] py-[0.5vh] rounded-sm font-semibold text-[1.6vh] cursor-pointer hover:underline'>
                    Onsite
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[2vh]'>
            <h1 className='text-[1.8vh] text-[#173440] font-semibold inter-tight'>
              About Meta
            </h1>
            <p className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh]'>
              Meta builds technologies that help people connect, find
              communities, and grow businesses. Our products empower billions of
              people worldwide to share ideas, offer support, and make a
              difference. We’re constantly innovating to push the boundaries of
              what’s possible. Come join a talented and dedicated team that’s
              focused on helping people around the world build meaningful
              connections.
            </p>

            <h1 className='text-[1.8vh] text-[#173440] font-semibold inter-tight'>
              Job Description
            </h1>
            <p className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh]'>
              We are looking for talented and experienced Software Engineers to
              join Meta’s engineering teams. As a Software Engineer, you will
              work on a variety of projects to build the infrastructure and
              platforms that power our family of products (Facebook, Instagram,
              WhatsApp, and Oculus). You will have the opportunity to solve
              complex technical challenges, scale our systems, and collaborate
              across different teams to create the next generation of social
              technology.{' '}
            </p>

            <h1 className='text-[1.8vh] text-[#173440] font-semibold inter-tight'>
              Responsibilities
            </h1>
            <ul className='ml-[1vw]'>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Design, develop, and maintain software systems, services, and
                applications that drive Meta’s products.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Collaborate with product managers, researchers, and engineers to
                gather and define software requirements.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Write high-quality, scalable, and secure code across different
                platforms and applications.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Build robust backend services, infrastructure, APIs, and data
                processing pipelines that support high-scale systems.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Debug and optimize code for performance, stability, and
                scalability.
              </li>
            </ul>

            <h1 className='text-[1.8vh] text-[#173440] font-semibold inter-tight'>
              Preferred Qualifications
            </h1>
            <ul className='ml-[1vw]'>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Experience with large-scale distributed systems, cloud
                infrastructure (AWS, GCP, etc.), or real-time data processing.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Experience with front-end technologies such as React,
                JavaScript, or TypeScript.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Familiarity with machine learning algorithms and data modeling
                techniques.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Experience in mobile development for iOS or Android is a plus.
              </li>
              <li className='inter-tight text-[#848486] text-[1.8vh] leading-[3vh] list-disc'>
                Prior experience contributing to open-source projects.
              </li>
            </ul>
          </div>
        </div>

        <div className='bg-[#F2F2F2] rounded-lg w-[35%] h-[78vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />
          <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
            94.9%
          </h1>
          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[2vh]'>
            {/* matching results  */}
            <div className='flex flex-row gap-[0.4vw] items-center'>
              <div className=' bg-[#E5E5E5] w-[25px] flex flex-row h-[25px] items-center justify-center rounded-full'>
                <CheckCircleOutlined className='text-[1.5vh]' />
              </div>
              <h1 className='text-[1.7vh] font-medium'>Matching results</h1>
            </div>

            <div className='flex flex-col gap-[1vh]'>
              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#348888] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Work Experience
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#6A6C72] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certifications
                </p>
              </div>

              <div className='flex flex-row items-center object-center gap-[1vw]'>
                <CheckCircleFilled className='text-[#173440] rounded-full text-[2.5vh]' />
                <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                  Education & Certification
                </p>
              </div>
            </div>
          </div>

          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[3vh]'>
            {/* people  */}
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row gap-[0.4vw] items-center'>
                <div className=' bg-[#E5E5E5] w-[45px] flex flex-row h-[45px] items-center justify-center rounded-full'>
                  <RiGroupLine className='text-[1.5vh]' />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-[1.7vh] font-medium'>People</h1>
                  <h1 className='text-[1.7vh] font-normal text-[#808080]'>
                    Attended Lehigh
                  </h1>
                </div>
              </div>

              <Select
                className=' bg-white text-black'
                defaultValue={'Recruiting Team'}
                options={[
                  { label: 'Recruiting Team', value: 'Recruiting Team' },
                  { label: 'Dev Team', value: 'Dev Team' },
                  { label: 'Marketing Team', value: 'Marketing Team' },
                ]}
              />
            </div>

            <div className='flex felx-row justify-between'>
              <Image
                src='https://images.pexels.com/photos/28570314/pexels-photo-28570314/free-photo-of-confident-young-woman-in-glasses-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />

              <Image
                src='https://images.pexels.com/photos/28927046/pexels-photo-28927046/free-photo-of-nigerian-woman-posing-with-books-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                preview={false}
              />
            </div>
          </div>

          <div>
            {/* actions  */}

            <div className='flex flex-row justify-between mt-[2vh] w-full'>
              <Button className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'>
                <Image
                  src={AILightImg.src}
                  className='h-[15px] w-[15px]'
                  preview={false}
                />
                Enhance resume
              </Button>

              <Button className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'>
                <Image
                  src={AIDarkImg.src}
                  className='h-[15px] w-[15px]'
                  preview={false}
                />
                Generate Cover Letter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[10vh]'>
        {/* simalr jobs  */}
        <h1 className='text-[4.5vh] font-semibold whyteInktrap_font'>
          Similar Jobs
        </h1>

        <div className='grid grid-cols-4 w-full gap-[3vh] '>
          {jobMatches.map((job, key) => (
            <>
              {key < 4 ? (
                <JobMatch
                  key={key}
                  companyName={job.companyName}
                  matchingPercentage={job.matchingPercentage}
                  date={job.date}
                  salary={job.salary}
                  title={job.title}
                />
              ) : (
                ''
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsLayout;
