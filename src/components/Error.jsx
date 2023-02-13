import React from 'react'

function Error({error}) {
  return (
    <div className='error-contianer'>something went wrong ! please try later <br /> {error}</div>
  )
}

export default Error