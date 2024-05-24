import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // this api send the request to the rapidapi endpoint

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  const allJobs = [];

  const { title, companyMatches } = req.body;
  
  // loop in all companies provided in req.body and send the request to the rapidapi endpoint and map the response to the company

  for(const company of companyMatches || []) {
    const options = {
      method: 'GET',
      url: 'https://jobs-api14.p.rapidapi.com/list',
      params: {
        query: `${title}, ${company.name}`,
        location: company.companyLocation,
        language: 'en_GB',
      },
      headers: {
        'X-RapidAPI-Key': 'c48dc9f7a6msh4210fd7179433c2p115b0ajsn901ff271c00a',
        'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      allJobs.push(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error processing the request' });
    }
  }

  res.status(200).json(allJobs);
}
