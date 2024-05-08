import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {logo} from './assets';
import {Home,CreatePost,Login, Showcase, CreateComic} from './pages';

const App = () => {
  return (
    <BrowserRouter>
     <header className='w-full flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <Link to='/' className='text-3xl sm:text-4xl font-bold text-[#6449ff] mb-4 sm:mb-0'>
        Comic<span className="text-[#ffbf00]">AIVerse</span>
      </Link>
      <nav className="space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
        <Link to='/create-image' className='font-inter font-medium text-white px-4 py-2 rounded-md block sm:inline-block'>
          Generate Images
        </Link>
        <Link to='/create-imageshowcase' className='font-inter font-medium text-gray-200 px-4 py-2 rounded-md block sm:inline-block'>
          Image Showcase
        </Link>
        <Link to='/create-comic' className='font-inter font-medium text-yellow-200 px-4 py-2 rounded-md block sm:inline-block'>
          Generate Comic Strips
        </Link>
        <Link to='/login' className='font-inter font-medium text-pink-200 px-4 py-2 rounded-md block sm:inline-block'>
          Login
        </Link>
      </nav>
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