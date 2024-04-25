import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {logo} from './assets';
import {Home,CreatePost,Showcase} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>

      </header>
    </BrowserRouter>
  )
}

export default App