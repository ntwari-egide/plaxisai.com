import GradientButton from '../controls/gradient-button';
import Testimonial from '../reusable/testimonial';

const TestimonialsPage = () => {

    const testimonials = [
        {
            userProfileImg: 'https://images.pexels.com/photos/13438105/pexels-photo-13438105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Sarah Johns',
            university: 'Harvard University',
            uniURL: 'https://www.harvard.edu/',
            major: 'Computer Science',
            mBody: 'Plaxis AI saved me so much time! 🎯 I used to spend hours editing my resume for every job, but now I get matched with the perfect companies instantly. Got my first interview last week!',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'James Lee',
            university: 'Yale University',
            uniURL: 'https://www.yale.edu/',
            major: 'Economics',
            mBody: `This tool is a game changer! It’s so easy to use, and I got matched with several internship opportunities I hadn’t even thought about before.
            
            I got matched with several internship opportunities I hadn’t even thought about before.
            `,
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Emily Davis',
            university: 'Princeton University',
            uniURL: 'https://www.princeton.edu/',
            major: 'Mechanical Engineering',
            mBody: 'I’ve been using Plaxis AI for two months, and I’m impressed by how well it understands my resume. The suggestions are always spot-on.',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/3362294/pexels-photo-3362294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Michael Chang',
            university: 'Columbia University',
            uniURL: 'https://www.columbia.edu/',
            major: 'Mathematics',
            mBody: 'Thanks to Plaxis AI, I landed an amazing internship in data science that I probably wouldn’t have found on my own. The matching process is seamless and accurate.',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Rachel Green',
            university: 'University of Pennsylvania',
            uniURL: 'https://www.upenn.edu/',
            major: 'Business Analytics',
            mBody: 'Plaxis AI helped me discover opportunities that aligned with my skills and interests. I had no idea how much time I was wasting manually searching for roles before using this tool.',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/3741018/pexels-photo-3741018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Jonathan Smith',
            university: 'Brown University',
            uniURL: 'https://www.brown.edu/',
            major: 'Political Science',
            mBody: 'Honestly, I was skeptical at first, but this AI matching tool blew my mind. It’s super intuitive, and I’ve been able to apply for internships that match my interests perfectly.      Honestly, I was skeptical at first, but this AI matching tool blew my mind. It’s super intuitive, and I’ve been able to apply for internships that match my interests perfectly.',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Ashley Wilson',
            university: 'Cornell University',
            uniURL: 'https://www.cornell.edu/',
            major: 'Architecture',
            mBody: 'With Plaxis AI, I can focus more on preparing for interviews rather than spending countless hours editing and tailoring my resume. It’s a lifesaver for busy students!',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/3775121/pexels-photo-3775121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'Olivia Wright',
            university: 'Dartmouth College',
            uniURL: 'https://home.dartmouth.edu/',
            major: 'Psychology',
            mBody: 'The resume-job matching feature of Plaxis AI is so efficient. I’ve gotten multiple internship recommendations that align perfectly with my career goals.',
        },
        {
            userProfileImg: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            userName: 'David Patel',
            university: 'Lehigh University',
            uniURL: 'https://www2.lehigh.edu/',
            major: 'Computer Science and Business',
            mBody: 'I was struggling to find internships that fit my hybrid major until I found Plaxis AI. Now, I’m applying to roles that perfectly match my diverse skill set!',
        }
    ];

  return (
    <div className='mt-[10vh] flex flex-col gap-[4vh] md:px-[3vw] px-[2vw]'>
      <div className='flex flex-row justify-between justify-items-center object-center items-center'>
        <div>
          <p className='text-[#F28729] inter-tight md:text-[2vh] font-medium'>
            Our users
          </p>
          <h1 className='text-[#000000] text-[2.5vh] md:text-[4.5vh] font-bold whyteInktrap_font  text-center md:text-start w-[25vw] mt-4 leading-[5vh]'>
            What are they saying about us?
          </h1>
        </div>
        <p className='w-[20vw] inter-tight  font-medium text-[1.7vh]'>
          Instantly access a curated list of top-matching companies and
          positions.
        </p>
        <GradientButton
          href='#home'
          text='Try it out'
          className='mt-[1vh] text-white bg-[#348888]'
          theme='colorfull'
          backgroundColor='#348888'
        />
      </div>
      <div className='grid grid-cols-3 gap-[2vw] auto-rows-auto'>
  {
    testimonials.map((testimony, key) => (
      <div key={key} className='flex flex-col h-auto'>
        <Testimonial 
          userProfileImg={testimony.userProfileImg}
          userName={testimony.userName}
          university={testimony.university}
          uniURL={testimony.uniURL}
          major={testimony.major}
          mBody={testimony.mBody}
        />
      </div>
    ))
  }
</div>
    </div>
  );
};

export default TestimonialsPage;
