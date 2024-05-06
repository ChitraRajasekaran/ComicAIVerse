import React, { useState } from 'react';


const ComicForm = ({ onSubmit }) => {
    const [panelTexts, setPanelTexts] = useState(Array(5).fill(''));
  
    const handleChange = (index, value) => {
      const newPanelTexts = [...panelTexts];
      newPanelTexts[index] = value;
      setPanelTexts(newPanelTexts);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(panelTexts);
    };
  
    const isButtonDisabled = panelTexts.some((text) => text.trim() === '');
  
    return (
      <form onSubmit={handleSubmit} className="comic-form">
        {panelTexts.map((text, index) => (
          <div key={index} className="mb-2 flex items-center">
            <span className="whitespace-nowrap w-28">Panel {index + 1}:</span>
            <input
            type="text"
            value={text}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Enter a text prompt for panel ${index + 1}`}
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        ))}
        <button
        type="submit"
        disabled={isButtonDisabled}
        className="font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 "
      >
        Generate Comic
      </button>
      
    </form>
    );
  };
  
  export default ComicForm;
