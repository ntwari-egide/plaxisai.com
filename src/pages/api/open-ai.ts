import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const openai = new OpenAI();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ message: 'Resume text is required' });
  }

  try {
    // Call OpenAI API to analyze the resume content and format the output as requested
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that analyzes resume text and suggests possible career titles and companies that might be interested in the individual. Please know that the company doesn't need to be fortune 100, no, it is all companies all over the world. If the application is not in US, suggest the companies in his/her/their country. Format the response as a JSON object with the following structure:\n\n{
            "title": "<Suggested Career Title>",
            "companyMatches": [
              {
                "id": <Unique ID>,
                "name": "<Company Name>",
                "companyLocation": "<Company Location>",
                "matchingCredit": <Matching Credit out of 10>
              },
              ...
            ]
          }`,
        },
        {
          role: 'user',
          content: `Resume Text:\n${resumeText}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.5,
    });    

    const analysisResult = completion.choices[0].message.content;

    // Parse the response as JSON
    const parsedResult = JSON.parse(analysisResult!);

    res.status(200).json(parsedResult);
  } catch (error) {
    res.status(500).json({ message: 'Error processing the request' });
  }
}
