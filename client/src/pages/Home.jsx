import React from 'react';
import video from '../assets/Final.mp4';
import { Link } from 'react-router-dom';
import storyImage from '../assets/story-image.jpg';
import coverImage from '../assets/cover-image.jpg';

const Home = () => {
  return (
    <div className="h-full w-full min-h-screen bg-black">
      <section className="wallpaper-section relative flex flex-col items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <video autoPlay muted playsInline loop className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="bannerTextContainer text-center relative z-10">
          <h1 className="bannerText min-h-0 px-8 text-center text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-6xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
            <span>Welcome to ComicAIVerse</span>
          </h1>
          <h1 className="bannerTextGradient min-h-0 px-8 text-center text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-6xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
            <span>A Vast Collection of</span>
            <span>AI Comics</span>
          </h1>
        </div>
        <div className="card-container flex justify-center mt-16 relative z-10">
          <Link to="/create-story" className="card bg-gray-200 rounded-lg shadow-lg p-6 mr-8 flex flex-col items-center">
            <h2 className="text-center bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-4xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
              <span className="text-[#6449ff]">Generate Story</span>
            </h2>
            <img src={storyImage} alt="Story" className="mt-4 max-h-72 object-contain" />
            <p className="text-center text-[#ec4899] text-lg font-poppins font-medium leading-relaxed mt-4">Generate a story for your comic.</p>
          </Link>
          <Link to="/create-cover" className="card bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-center bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-4xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
              <span className="text-[#6449ff]">Generate Cover</span>
            </h2>
            <img src={coverImage} alt="Cover" className="mt-4 max-h-72 object-contain" />
            <p className="text-center text-[#ec4899] text-lg font-poppins font-medium leading-relaxed mt-4">Generate a cover for your comic.</p>
          </Link>
        </div>
      </section>
      <div className="descriptionContainer flex flex-col items-center mt-32 px-4">
        <h2 className="descriptionPreTitle text-[#f5c74a] font-poppins text-base font-semibold uppercase">OUR COLLECTIONS</h2>
        <h1 className="descriptionMainTitle text-center text-white font-poppins text-4xl font-semibold leading-normal tracking-wide">The AI-Powered Comics Creation</h1>
        <p className="descriptionText text-center text-white text-opacity-80 max-w-md font-poppins text-lg font-medium leading-relaxed mt-8 mb-8">Transform your stories into comics, and share them with millions of comic enthusiasts worldwide.</p>
      </div>
    </div>
  );
};

export default Home;