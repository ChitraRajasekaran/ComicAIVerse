import React, {useState} from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,
    isSurpriseMe,handleSurpriseMe,}) =>  {
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
            className='font-semibold text-xs bg-[#ECECF1] py-1
            px-2 rounded-[5px] text-black'
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900
        text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  )
};

import { surpriseMePrompts } from '../constants';

function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}




const CreateStory = () => {
    const [form, setForm] = useState({
      name: '',
      prompt: '',
      story: '',
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Send request to OpenAI API with form.prompt
      // Update form.story with the response from the API
      // Example: fetchOpenAIStory(form.prompt)
      //   .then(response => setForm({ ...form, story: response }))
      //   .catch(error => console.error('Error:', error));
    };
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSurpriseMe = () => {
      const randomPrompt = getRandomPrompt(form.prompt);
      setForm({ ...form, prompt: randomPrompt });
    };
  
    return (
      <section className='max-w-7x1 mx-auto'>
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px]'>Generate</h1>
          <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'> Generate imaginative and visually stunning cover images of comic books and share them with ComicAIVerse community</p>
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
            <h2 className='font-semibold  text-lg text-[#222328]'>Generated Story:</h2>
            <p className='mt-2 text-[#666e75]'>{form.story}</p>
          </div>
        )}
      </section>
    );
  };
  
  export default CreateStory;