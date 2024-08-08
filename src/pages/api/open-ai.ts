import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

import allowCors from '@/utils/cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI();

  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Only POST requests allowed' });
  // }

  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ message: 'Resume text is required' });
  }

  try {
    // Call OpenAI API to analyze the validity of the resume text

    const validationCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that analyzes resume text and suggests possible career titles and companies that might be interested in the individual. Please provide the resume text for analysis. Analyse if the content provided matches the format of a typical resume. Check the name, address, phone number, email, education, experience, and skills sections. You can tolerate three errors in the resume text. The response should be like this:
          {
            "isValid": true,
            "errors": [
              {
                "section": "<section content>",
                "isValid": <boolean>,
                "message": "<Friendly message of what's missing>"
              },
              ...
            ]
          } `,
        },
        {
          role: 'user',
          content: `Resume Text:\n${resumeText}`,
        },
      ],
    });

    const validationAnalysisResult =
      validationCompletion.choices[0].message.content;

    // Parse the response as JSON
    const parsedValidationResult = JSON.parse(validationAnalysisResult!);

    if (parsedValidationResult.isValid) {
      // Call OpenAI API to analyze the resume content and format the output as requested
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
          You are a helpful assistant that analyzes resume text and suggests possible career titles and companies that might be interested in the individual. Please provide the following details for better suggestions: 
          
          1. The individual's specific region or country.
          2. Any specific industries or sectors of interest.
          3. Any preferred company size (e.g., startup, mid-size, large corporation).
          4. Any specific skills or technologies mentioned in the resume.
          5. If no internship is mentioned in the resume, suggest resume-focused opportunities.
          
          Please format the response as a JSON object with the following structure:\n\n{
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

      const result = {
        validity: parsedValidationResult,
        analysis: parsedResult,
      };

      return res.status(200).json(result);
    } else {
      const result = {
        validity: parsedValidationResult,
        analysis: null,
      };

      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing the request' });
  }
}

export default allowCors(handler);
