import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Use CORS middleware
router.use(cors({ origin: 'https://comic-ai-verse.vercel.app' }));

// GET Route
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// POST Route
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });
    const image = aiResponse.data[0].url;
    res.status(200).json({ success: true, photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

export default router;