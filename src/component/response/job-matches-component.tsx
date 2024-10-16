import JobMatch from '../matches/job';

export const jobMatches = [
  {
    companyName: 'Apple',
    matchingPercentage: '94.5%',
    date: '20 May, 2024',
    salary: '$40/hr',
    title: 'Software Engineering Intern',
  },
  {
    companyName: 'Apple',
    matchingPercentage: '90.0%',
    date: '15 June, 2024',
    salary: '$42/hr',
    title: 'Data Analyst Intern',
  },
  {
    companyName: 'Apple',
    matchingPercentage: '89.0%',
    date: '1 July, 2024',
    salary: '$38/hr',
    title: 'UI/UX Design Intern',
  },
  {
    companyName: 'Microsoft',
    matchingPercentage: '92.3%',
    date: '5 June, 2024',
    salary: '$45/hr',
    title: 'Software Development Intern',
  },
  {
    companyName: 'Microsoft',
    matchingPercentage: '91.5%',
    date: '10 July, 2024',
    salary: '$50/hr',
    title: 'Cloud Engineering Intern',
  },
  {
    companyName: 'Microsoft',
    matchingPercentage: '88.0%',
    date: '20 July, 2024',
    salary: '$44/hr',
    title: 'Data Scientist Intern',
  },
  {
    companyName: 'Meta',
    matchingPercentage: '93.0%',
    date: '22 May, 2024',
    salary: '$43/hr',
    title: 'Product Management Intern',
  },
  {
    companyName: 'Meta',
    matchingPercentage: '90.2%',
    date: '12 June, 2024',
    salary: '$41/hr',
    title: 'Software Engineering Intern',
  },
  {
    companyName: 'Meta',
    matchingPercentage: '89.5%',
    date: '18 July, 2024',
    salary: '$39/hr',
    title: 'Machine Learning Intern',
  },
  // Add more job objects here to reach a total of 40
];
const JobMatchesComponent = () => {
  return (
    <div className='grid grid-cols-3 w-full gap-[3vh] '>
      {jobMatches.map((job, key) => (
        <JobMatch
          key={key}
          companyName={job.companyName}
          matchingPercentage={job.matchingPercentage}
          date={job.date}
          salary={job.salary}
          title={job.title}
        />
      ))}
    </div>
  );
};

export default JobMatchesComponent;
