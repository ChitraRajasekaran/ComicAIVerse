// import express from 'express';
// import * as dotenv from 'dotenv';
// import OpenAIApi from 'openai';

// dotenv.config();

// const router = express.Router();


// const openai = new OpenAIApi({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   router.route('/').get((req, res) => {
//     res.status(200).json({ message: 'Hello from DALL-E!' });
//   });

//   router.route('/').post(async(req,res) => {
//     try{
//         const {prompt} = req.body;

//         const aiResponse = await openai.images.generate({
//             model: 'dall-e-3',
//             prompt,
//             n:1,
//             size:'1024x1024',
//         })
//         const image = aiResponse.data[0].url;
//     res.status(200).json({ success: true, photo: image, story: story });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Something went wrong');
//   }
// });


//   export default router;
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
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