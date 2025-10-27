import React, { useState } from 'react'

const CarImages = ({ car }) => {
  const [selectedImage, setSelectedImage] = useState(car?.images?.[0] || '')

  if (!car || !car.images || car.images.length === 0) {
    return <div>No images available</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Image */}
      <div className='w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg'>
        <img
          src={selectedImage}
          alt={car.title}
          className='w-full h-full object-cover'
        />
      </div>
      {/* Thumbnail Images */}
      <div className='flex gap-2 overflow-x-auto'>
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${car.title} ${index + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 ${
              selectedImage === image ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default CarImages
