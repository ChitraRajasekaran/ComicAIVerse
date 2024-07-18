import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mysqldb/models/post.js';
import { Configuration, OpenAIApi } from 'openai';
import sharp from 'sharp';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to add CORS headers
const addCorsHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://comic-ai-verse.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

// GET ALL POSTS
router.route('/').get(addCorsHeaders, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// CREATE POSTS
router.post('/', addCorsHeaders, async (req, res) => {
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
router.post('/story', addCorsHeaders, async (req, res) => {
  try {
    const { name, prompt } = req.body;

    // Generate Story
    const aiStoryResponse = await openai.createChatCompletion({
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

// CREATE COMIC STRIP
router.post('/comicstrip', addCorsHeaders, async (req, res) => {
  try {
    const { name, prompt, story } = req.body;

    if (!story) {
      return res.status(400).json({ success: false, message: 'Story is required to generate a comic strip' });
    }

    const storyLines = story.split('\n');

    if (storyLines.length !== 5) {
      return res.status(400).json({ success: false, message: 'The story must have exactly 5 lines' });
    }

    const images = await Promise.all(
      storyLines.map(async (line) => {
        const aiImageResponse = await openai.createImage({
          model: 'dall-e-2',
          prompt: line,
          n: 1,
          size: '1024x1024',
        });
        // Upload Image to Cloudinary
        const photoUrl = await cloudinary.uploader.upload(aiImageResponse.data[0].url);
        return photoUrl.url;
      })
    );

    // Create New Post
    const newPost = await Post.create({
      name,
      prompt,
      story,
      photo: images[0], // Set the first image as the cover image
      comicStrip: images, // Add the comicStrip field to the Post model
    });

    res.status(200).json({ success: true, data: { comicStrip: images } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Unable to generate comic strip, please try again' });
  }
});

export default router;
