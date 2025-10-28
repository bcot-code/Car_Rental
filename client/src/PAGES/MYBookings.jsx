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
          <div key={booking._id}>
            {/* CAR LIST */}
            <div>
              <div>
                <img src={booking.car.images[0]} alt=''/>
              </div>
              <div>
                <h5>{booking.car.title}</h5>
                <div>
                  <div>
                    <h5>Seats</h5>
                    <p>{booking.car.specs.seats}</p>
                  </div>
                  <div>
                    <h5>Total:</h5>
                    <p>{currency}{booking.totalPrice}</p>
                  </div>
                </div>
                <p>
                  <img src={assets.pin} alt="" width={13}/>
                  {booking.car.address}
                </p>
              </div>
            </div>
            {/* Booking Summary */}
            <div>
              <div>
                <div>
                  <h5>Booking ID:</h5>
                  <p>{booking._id}</p>
                </div>
                <div>
                  <h5>Pick-Up:</h5>
                  <p>{new Date(booking.pickUpDate).toDateString()}</p>
                </div>
                <div>
                  <h5>Drop OFF:</h5>
                  <p>{new Date(booking.dropOffDate).toDateString()}</p>
                </div>
              </div>
              <div>
                <div>
                  <h5>Payment:</h5>
                  <div>
                    <span></span>
                    <p>{booking.isPaid ? "Paid" : "UnPaid"}</p>
                  </div>
                </div>
                {!booking.isPaid && (
                  <button>Pay Now</button>
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