import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';
import cors from 'cors';


dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use CORS middleware globally
app.use(cors({
  origin: 'https://comic-ai-verse.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
}));

// Middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
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