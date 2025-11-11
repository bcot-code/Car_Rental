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
import Sidebar from './components/owner/Sidebar'
import Dashboard from './PAGES/owner/Dashboard'
import AddCar from './PAGES/owner/AddCar'
import ListCar from './PAGES/owner/ListCar'




const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner')

  return (
    <main>
      {!isOwnerPath && <Header/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listing/:id' element={<CarDetails/>}/>
        <Route path='/listing' element={<Listing/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-bookings' element={<MYBookings/>}/>

        {/* OWNER routes */}
        <Route path='/owner' element={<Sidebar/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='list-car' element={<ListCar/>}/>
        </Route>
      </Routes>
     {!isOwnerPath && <Footer/>}
    </main>
  )
}

export default App
