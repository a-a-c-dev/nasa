import React from 'react'

interface  InputTextProps{
  handleChange:(value:string)=>void,
  autoSearch:string
}

function InputText({handleChange,autoSearch}:InputTextProps) {
  return (
    <div className='box'>
        <span>Filter a specific title :</span> 
         <input type="text" placeholder='Filter by title' value={autoSearch} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e.target.value)} />
    </div>
    )
}

export default InputText