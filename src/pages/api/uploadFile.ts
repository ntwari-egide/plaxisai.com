/* eslint-disable unused-imports/no-unused-vars */
// Import docx library
import formidable from 'formidable';
import fs from 'fs';
import mammoth from 'mammoth';
import { NextApiRequest, NextApiResponse } from 'next';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      const file = files.file as formidable.File | undefined;
      const fileType = file?.originalFilename?.split('.').pop()?.toLowerCase();

      if (fileType == 'pdf') {
        const dataBuffer = fs.readFileSync(file?.filepath?.toString() || '');
        const pdfData = await pdf(dataBuffer);
        const content = pdfData.text;
        res.status(200).json({ content });
      } else if (fileType == 'txt/plain') {
        const dataBuffer = fs.readFileSync(file?.filepath?.toString() || '');
        const content = dataBuffer.toString();
        res.status(200).json({ content });
      } else if (
        fileType == 'docx' ||
        fileType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const dataBuffer = fs.readFileSync(file?.filepath?.toString() || '');
        mammoth
          .extractRawText({ buffer: dataBuffer })
          .then((result) => {
            const content = result.value;
            res.status(200).json({ content });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: 'Failed to extract text from .docx file' });
          });
      } else {
        res.status(400).json({ error: 'Invalid file type' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
