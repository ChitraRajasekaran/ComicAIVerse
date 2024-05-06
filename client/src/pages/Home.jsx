import React from 'react';
import video from '../assets/Final.mp4';

const Home = () => {
  return (
    <div>
      <section className="wallpaper-section relative flex flex-col items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <video autoPlay muted playsInline loop className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="bannerTextContainer text-center">
          <h1 className="bannerText min-h-0 px-8 relative z-20 text-white text-center font-poppins font-semibold text-6xl leading-tight tracking-wide flex flex-wrap justify-center items-center gap-x-3">
            <span>Create comics with AI in minutes</span>
          </h1>
          <h1 className="bannerTextGradient min-h-0 px-8 text-center text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-pink-500 bg-clip-text text-6xl font-poppins font-semibold leading-tight tracking-wide filter drop-shadow-md flex flex-wrap justify-center items-center gap-x-3">
            <span>Publish to</span>
            <span> millions</span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
