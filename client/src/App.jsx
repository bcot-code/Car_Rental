import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Listing from './PAGES/Listing'
import Contact from './PAGES/Contact'
import CarDetails from './PAGES/CarDetails'
import MYBookings from './PAGES/MYBookings'
import Home from './PAGES/Home'
import Blog from './PAGES/Blog'
import Footer from './components/Footer'




const App = () => {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listing/:id' element={<CarDetails/>}/>
        <Route path='/listing' element={<Listing/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-bookings' element={<MYBookings/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
