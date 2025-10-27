import React, { useState } from 'react'

const CarImages = ({ car }) => {
  const [selectedImage, setSelectedImage] = useState(car?.images?.[0] || '')

  if (!car || !car.images || car.images.length === 0) {
    return <div>No images available</div>
  }

  return (
    <div className='flex flex-col md:flex-row md:justify-center gap-4 md:max-h-96 shadow-lg rounded-lg p-4'>
      {/* Main Image */}
      <div className='w-full md:flex-2 h-64 md:h-full lg:h-96 overflow-hidden rounded-lg'>
        <img
          src={selectedImage}
          alt={car.title}
          className='w-full h-full object-contain'
        />
      </div>
      {/* Thumbnail Images */}
      <div className='flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-96'>
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
