import React from 'react'

function ImageContainer({imageSrc, imagedesc}) {
  return (
    <div className='image-container'>
        <img src={imageSrc} alt={imagedesc} />
    </div>
  )
}

export default ImageContainer