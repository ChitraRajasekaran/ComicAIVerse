import React, { useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import html2canvas from 'html2canvas';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ComicDisplay = ({ images }) => {
  const gridContainerRef = useRef(null);

  const calculateLayout = () => {
    const columns = window.innerWidth > 1200 ? 5 : window.innerWidth > 768 ? 3 : 2;

    return images.map((_, index) => ({
      i: index.toString(),
      x: (index % columns) * 2,
      y: Math.floor(index / columns) * 2,
      w: 2,
      h: 2,
    }));
  };

  const handleDownloadImage = async () => {
    if (gridContainerRef.current) {
      try {
        // Array to store promises for image loading
        const imageLoadPromises = [];
  
        // Iterate over each image and create a promise for image loading
        images.forEach((imageSrc) => {
          const img = new Image();
          img.src = imageSrc;
          const imageLoadPromise = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          imageLoadPromises.push(imageLoadPromise);
        });
  
        // Wait for all image loading promises to resolve
        await Promise.all(imageLoadPromises);
  
        // Capture the canvas
        const canvas = await html2canvas(gridContainerRef.current);
  
        // Convert canvas to blob
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'comic_strip.png';
        link.click();
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  };
  
  

  return (
    <div>
      <div className="flex items-center px-2.5 pb-2.5">
        <button
          className="font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 "
          onClick={handleDownloadImage}
        >
          Download Image
        </button>
        <div className="ml-auto text-gray-500 font-Italic pl-2.5">
          Tip: Resize by dragging the bottom left corner of images and rearrange them by dragging and dropping to create your favorite comic strip layout!
        </div>
      </div>
      <div ref={gridContainerRef} className="p-2.5 border-2 border-black">
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
          {images.map((image, index) => (
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
    </div>
  );
};

export default ComicDisplay;
