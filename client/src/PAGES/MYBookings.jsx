import React, {useEffect, useState} from 'react'
import { assets, dummyBookingsData } from '../assets/data';
import { useUser } from '@clerk/clerk-react';

const MYBookings = () => {
  const [bookings,setBookings] = useState([]);
  const currency = "$"
  const { user } = useUser();

  const getUserBookings = async() =>{
    setBookings(dummyBookingsData)
  
  }

  useEffect(() =>{
    if(user){
      getUserBookings();
    }
  }, [user])

  return (
    <div className='bg-primary py-16 pt-28'>
      <div className='max-padd-container'>
        {bookings?.map((booking)=>(
          <div key={booking._id} className='bg-white ring-1
          ring-slate-900/5 p-2 pr-4 mt-3 rounded.lg'>
            {/* CAR LIST */}
            <div className='flexStart gap-3 mb-3'>
              <div className='bg-primary rounded-xl overflow-hidden
              flexCenter h-19'>
                <img src={booking.car.images[0]} alt=''
                  className='max-w-full max-h-full object-contain'
                />
              </div>
              <div>
                <h5 className='capitalize line-clamp-1'>{booking.car.title}</h5>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-x-2'>
                    <h5>Seats</h5>
                    <p>{booking.car.specs.seats}</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <h5>Total:</h5>
                    <p className='text-gray-400 text-sm'>{currency}{booking.totalPrice}</p>
                  </div>
                </div>
                <p className='flex place-items-baseline gap-1 mt-0.5'>
                  <img src={assets.pin} alt="" width={13}/>
                  {booking.car.address}
                </p>
              </div>
            </div>
            {/* Booking Summary */}
            <div className='flex flex-col lg:flex-row justify-between
            items-start lg:items-center gap-3 border-t border-gray-300
            pt-3'>
              <div className='flex gap-2 gap-x-4 flex-wrap'>
                <div className='flex items-center gap-x-2'>
                  <h5>Booking ID:</h5>
                  <p className='text-gray-400 text-xs'>{booking._id}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5>Pick-Up:</h5>
                  <p className='text-gray-400 text-xs'>{new Date(booking.pickUpDate).toDateString()}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5>Drop OFF:</h5>
                  <p className='text-gray-400 text-xs'>{new Date(booking.dropOffDate).toDateString()}</p>
                </div>
              </div>
              <div className='flex gap-2 gap-x-3'>
                <div className='flex items-center gap-x-2'>
                  <h5>Payment:</h5>
                  <div className='flex items-center gap-1'>
                    <span className={`min-w-2.5 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-yellow-500"}`}/>
                    <p>{booking.isPaid ? "Paid" : "Unpaid"}</p>
                  </div>
                </div>
                {!booking.isPaid && (
                  <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200'>Pay Now</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MYBookings