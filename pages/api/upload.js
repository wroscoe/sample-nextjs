import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable'; // Use named import

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const form = new IncomingForm({ 
      uploadDir,
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error processing file' });
      }
      res.status(200).json({ message: 'File saved', files });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
