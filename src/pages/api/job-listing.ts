import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface CompanyMatch {
  id: number;
  name: string;
  companyLocation: string;
}

interface JobResult {
  id: number;
  company: string;
  jobs: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  const { title, companyMatches }: { title: string; companyMatches: CompanyMatch[] } = req.body;
  
  if (!title || !companyMatches || companyMatches.length === 0) {
    res.status(400).json({ message: 'Title and company matches are required' });
    return;
  }

  try {
    // Collect all job promises
    const jobPromises = companyMatches.map(async (company, index) => {
      const options = {
        method: 'GET',
        url: 'https://jobs-api14.p.rapidapi.com/list',
        params: {
          query: `${title}, ${company.name}`,
          location: company.companyLocation,
          language: 'en_GB',
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        return { id: index + 1, company: company.name, jobs: response.data };
      } catch (error) {
        // console.error(`Error fetching data for company ${company.name}:`, error);
        return { id: index + 1, company: company.name, jobs: null };
      }
    });

    // Wait for all promises to resolve
    const jobResults: JobResult[] = await Promise.all(jobPromises);

    // Filter out any null job results
    const validJobResults = jobResults.filter(result => result.jobs !== null);    

    res.status(200).json(validJobResults);
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ message: 'Error processing the request' });
  }
}
