import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import jsPDF from 'jspdf';
import loadImage from 'load-img';

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

import { surpriseMePrompts } from '../constants';

function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const CreateStory = () => {
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    story: '',
    images: [],
  });

  const [images, setImages] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showTip, setShowTip] = useState(false);

  // const handleDownload = () => {
  //   const doc = new jsPDF();

  //   // Loop through the images and add them to the PDF
  //   images.forEach((image, index) => {
  //     doc.addImage(image, 'JPEG', 10, 10 + (index * 100), 200, 100);
  //   });

  //   // Save the PDF
  //   doc.save('comic-strip.pdf');
  // };


  const handleDownload = async () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // Set the PDF document orientation and size
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Loop through the images and add them to the PDF
    for (const image of images) {
      const img = await loadImage(image);
  
      const imgWidth = img.width;
      const imgHeight = img.height;
      const imgRatio = imgWidth / imgHeight;
      const pageRatio = pageWidth / pageHeight;
  
      let imgX, imgY, imgDrawWidth, imgDrawHeight;
  
      if (imgRatio >= pageRatio) {
        // Image is wider than the page
        imgDrawWidth = pageWidth;
        imgDrawHeight = pageWidth / imgRatio;
        imgX = 0;
        imgY = (pageHeight - imgDrawHeight) / 2;
      } else {
        // Image is taller than the page
        imgDrawHeight = pageHeight;
        imgDrawWidth = pageHeight * imgRatio;
        imgX = (pageWidth - imgDrawWidth) / 2;
        imgY = 0;
      }
  
      if (image !== images[0]) {
        doc.addPage();
      }
  
      doc.addImage(img, 'JPEG', imgX, imgY, imgDrawWidth, imgDrawHeight);
    }
  
    // Save the PDF
    doc.save('comic-strip.pdf');
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://comic-ai-verse-server.vercel.app/api/v1/post/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: form.name, prompt: form.prompt }),
      });

      const data = await response.json();
      if (data.success) {
        setForm({ ...form, story: data.data.story });
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateComicStrip = async () => {
    try {
      const response = await fetch('https://comic-ai-verse-server.vercel.app/api/v1/post/comicstrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: form.name, prompt: form.prompt, story: form.story }),
      });

      const data = await response.json();
      if (data.success) {
        setImages(data.data.comicStrip);
        setForm({ ...form, images: data.data.comicStrip });
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowDownloadButton(true);
    setShowTip(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const calculateLayout = () => {
    const columns = window.innerWidth > 1200 ? 5 : window.innerWidth > 768 ? 3 : 2;

    return form.images.map((_, index) => ({
      i: index.toString(),
      x: (index % columns) * 2,
      y: Math.floor(index / columns) * 2,
      w: 2,
      h: 2,
    }));
  };

  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Generate</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
          Generate imaginative and visually stunning cover images of comic books and share them with ComicAIVerse community
        </p>
      </div>
      <form className='mt-16 max-w-3x1' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Enter your one-liner prompt here"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>
        <button
          type="submit"
          className='bg-[#6449ff] text-white px-6 py-2 rounded-md hover:bg-[#5542e3] transition-colors duration-300'
        >
          Generate Story
        </button>
      </form>
      {form.story && (
        <div className='mt-8'>
          <h2 className='font-semibold text-lg text-[#222328]'>Generated Story:</h2>
          <div className='mt-2 text-[#666e75]'>
            {form.story.split('\n').map((line, index) => (
              <p key={index} className='mb-2'>{line}</p>
            ))}
          </div>
          <button
            onClick={handleGenerateComicStrip}
            className='bg-[#6449ff] text-white px-6 py-2 rounded-md hover:bg-[#5542e3] transition-colors duration-300 mt-4'
          >
            Generate Comic Strip
          </button>
        </div>
      )}
      {form.images.length > 0 && (
        <div className='mt-8'>
          <h2 className='font-semibold text-lg text-[#222328]'>Generated Comic Strip:</h2>
          <div className="p-2.5 border-2 border-black">
            <ResponsiveGridLayout
              className="layout"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={100}
              margin={[10, 10]}
              containerPadding={[0, 0]}
              layout={calculateLayout()}
              isDraggable={true}
              isResizable={true}
            >
              {form.images.map((image, index) => (
                <div key={index} data-grid={{ i: index.toString(), x: 0, y: 0, w: 2, h: 2 }}>
                  <img
                    src={image}
                    alt={`Panel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
          {showDownloadButton && (
            <div className="ml-auto">
              <button
                onClick={handleDownload}
                className='bg-[#6449ff] text-white px-6 py-2 rounded-md hover:bg-[#5542e3] transition-colors duration-300 mt-4'
              >
                Download as PDF
              </button>
            </div>
          )}
          {showTip && (
            <div className="ml-auto text-gray-500 font-Italic pl-2.5">
              Tip: Resize by dragging the bottom left corner of images and rearrange them by dragging and dropping to create your favorite comic strip layout!
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CreateStory;
