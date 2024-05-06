import React from 'react';
import video from '../assets/Final.mp4';

const Home = () => {
  return (
    <div class="h-full w-full min-h-screen bg-black">
      <section className="wallpaper-section relative flex flex-col items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <video autoPlay muted playsInline loop className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="bannerTextContainer text-center">
          <h1 className="bannerText min-h-0 px-8 text-center text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-6xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
            <span>Welcome to ComicAIVerse</span>
          </h1>
          <h1 className="bannerTextGradient min-h-0 px-8 text-center text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-6xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
            <span>A Vast Collection of</span>
            <span>AI Comics</span>
          </h1>
        </div>
      </section>
      <div class="descriptionContainer flex flex-col items-center mt-32 px-4">
        <h2 class="descriptionPreTitle text-[#f5c74a] font-poppins text-base font-semibold uppercase">OUR COLLECTIONS</h2>
        <h1 class="descriptionMainTitle text-center text-white font-poppins text-4xl font-semibold leading-normal tracking-wide">The AI-Powered Comics Creation</h1>
        <p class="descriptionText text-center text-white text-opacity-80 max-w-md font-poppins text-lg font-medium leading-relaxed mt-8 mb-8">Transform your stories into comics, and share them with millions of comic enthusiasts worldwide.</p>
      </div>
    </div>
  );
};

export default Home;
