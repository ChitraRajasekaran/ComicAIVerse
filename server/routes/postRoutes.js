import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mysqldb/models/post.js';
import OpenAIApi from 'openai';
import sharp from 'sharp';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
//GET ALL POSTS
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});
//CREATE POSTS
router.post('/' , async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});
// CREATE STORY
router.post('/story', async (req, res) => {
  try {
    const { name, prompt } = req.body;

    // Generate Story
    const aiStoryResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Write a 5-line comic book story: ${prompt}` }],
      max_tokens: 150,
    });

    const story = aiStoryResponse.choices[0].message.content.trim();

    // Create New Post
    const newPost = await Post.create({
      name,
      prompt,
      story, // Set the story field with the generated story
    });

    res.status(200).json({ success: true, data: { story } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Unable to generate story, please try again' });
  }
});



export default router;

// import express from 'express';
// import * as dotenv from 'dotenv';
// import { v2 as cloudinary } from 'cloudinary';
// import Post from '../mysqldb/models/post.js';
// import OpenAIApi from 'openai';
// import sharp from 'sharp';
// import axios from 'axios';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // GET ALL POSTS
// router.route('/').get(async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).json({ success: true, data: posts });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
//   }
// });

// // CREATE POSTS
// router.post('/', async (req, res) => {
//   try {
//     const { name, prompt } = req.body;

//     // // Generate Image
//     // const aiImageResponse = await openai.images.generate({
//     //   model: 'dall-e-3',
//     //   prompt,
//     //   n: 1,
//     //   size: '1024x1024',
//     // });
//     // const image = aiImageResponse.data[0].url; // Ensure the correct path to the image URL

//   // Generate Story
//   const aiStoryResponse = await openai.chat.completions.create({
//     model: 'gpt-4', // Update this to the available model
//     messages: [{ role: 'user', content: `Write a 5-line comic book story: ${prompt}` }],
//     max_tokens: 150,
//   });

//     // Log the full response for debugging
//     console.log('OpenAI Story Response:', aiStoryResponse.choices[0].message.content);

//     const story = aiStoryResponse.choices[0].message.content.trim();
//     const storyLines = story.split('\n');

//     const images = await Promise.all(
//       storyLines.map(async (line) => {
//         if (line && line.trim().length > 0) { // Check if the line is not empty or undefined
//           const aiImageResponse = await openai.images.generate({
//             model: 'dall-e-2',
//             prompt: line,
//             n: 1,
//             size: '1024x1024',
//           });
//           // Upload Image to Cloudinary
//           const photoUrl = await cloudinary.uploader.upload(aiImageResponse.data[0].url);
//           return photoUrl.url;
//         } else {
//           console.warn('Skipping empty line:', line);
//           return null; // Return null or handle the empty line case as desired
//         }
//       })
//     );
//     // Create New Post
//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: images[0],
//       story, // Ensure your Post model has a story field
//     });

//     res.status(200).json({ success: true, data: { story, images } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
//   }
// });

// export default router;