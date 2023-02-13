import React from 'react'

function InputText({handleChange,autoSearch}) {
  return (
    <div className='box'>
        <span>Filter a specific title :</span> 
         <input type="text" placeholder='Filter by title' value={autoSearch} onChange={(e)=>handleChange(e.target.value)} />
    </div>
    )
}

export default InputText