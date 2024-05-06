import React, { useState } from 'react';
import ComicForm from '../Components/ComicForm';
import ComicDisplay from '../Components/ComicDisplay';
import query from '../api/GenerateComic.js';

function CreateComic() {
  const [comicImages, setComicImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);

  const generateComic = async (panelTexts) => {
    try {
      setIsSubmitPressed(true);
      setProgress(0);
      const imagePromises = panelTexts.map((text) => query({ prompt: text }, () => setProgress((prev) => prev + 1)));
      const images = await Promise.all(imagePromises);
      console.log('Generated comic images:', images);
      setComicImages(images);
    } catch (error) {
      console.error('Error generating comic:', error);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {

  }
  return (
    <div className="outer-container">
      <div className="flex flex-col items-center min-h-screen py-8">
        <div className="flex flex-wrap justify-center w-full max-w-7xl">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <ComicForm onSubmit={generateComic} />
          </div>
          <div className="w-full md:w-2/3 px-4">
            {isSubmitPressed ? (
              <ComicDisplay images={comicImages} />
            ) : (
              <p className="text-gray-500 font-bold text-center h-full flex items-center justify-center">
                Enter text prompts to generate your comic strip!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComic;
