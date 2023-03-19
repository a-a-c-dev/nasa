import React from 'react'

interface ImageContainerProps{
  imageSrc:string,
  imagedesc:string
}

function ImageContainer({imageSrc, imagedesc}:ImageContainerProps) {
  return (
    <div className='image-container'>
        <img src={imageSrc} alt={imagedesc} />
    </div>
  )
}

export default ImageContainer