import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {assets, cities, dummyCars} from "../assets/data"
import Title from './Title'
import Item from './Item'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const FeaturedCars = () => {
  const [featured, setFeatured] = useState([])

  useEffect(()=>{
    const data = dummyCars.filter((car)=> cities.includes(car.city))
    setFeatured(data)
  },[dummyCars])
  return (
    <section className='max-padd-container py-16 xl:py-28'>
      <Title
        title1={"Your Next Car Awaits"}
        title2={"Start Driving With Ease"}
        titleStyles={"mb-10"}
      />
      <div className='flexBetween mt-8 mg-6'>
        <h5>
          <span className='font-bold'>Displaying 1-6</span> from 3k listings
        </h5>
        <Link to={'/listing'} onClick={()=>window.scrollTo(0,0)}
        className='bg-blue-400 text-white text-2xl rounded-md p-2
        flexCenter'>
          <img src={assets.sliders} alt='' className='invert'/>
        </Link>
      </div>
      {/* CONTAINER */}
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1124: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
      >
        {featured.slice(0,6).map((car)=>(
        <SwiperSlide key={car._id}>
          <Item car={car}/>
        
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default FeaturedCars