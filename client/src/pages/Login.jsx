import React, { useState } from 'react';

const Login = () => {
  const PasswordForm = () => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Your form submission logic here
    };

    return (
      <section className='sm:p-8 px-4 py-8 w-full bg-[#000000] text-[#03A062] min-h-[calc(100vh-73px)]'> 
        <div className='uppercase'>
          <p className="font-[t26-carbon,monospace] text-[16px]">
            <span>comicAIVerse - Welcome - 2 ~ %</span> <br />
            <span>Comic enthusiasts vibrant images</span> <br />
            <span>Location: Online</span> 
          </p>
          <p>----------------------------------------------------------</p>
          <p className="font-[t26-carbon,monospace] text-[22px] text-white">
            <span>Join Our Community
            </span>
          </p>
        </div>
        
      </section>
    );
  };
};

export default Login;