import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {logo} from './assets';
import {Home,CreatePost,Login, Showcase, CreateComic} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to = '/'>
          <img src={logo} alt ='logo' className='w-28 object-contain' />
        </Link>
        <Link to ='/create-image' className='font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 
        rounded-md'>Generate Images</Link>
        <Link to ='/create-imageshowcase' className='font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 
        rounded-md'>Image Showcase</Link>
        <Link to ='/create-comic' className='font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 
        rounded-md'>Generate Comic Strips</Link>
        {/* <Link to ='/Login' className='font-inter font-medium bg-[#000000] text-[#FFBF00] px-4 py-2 
        rounded-md'>Login</Link> */}
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9f8fe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path ='/' element ={<Home />} />
          <Route path ='/create-imageshowcase' element ={<Showcase />} />
          <Route path='/create-image' element = {<CreatePost />} />
          <Route path='/create-comic' element = {<CreateComic />} />
          {/* <Route path='/Login' element = {<Login />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App