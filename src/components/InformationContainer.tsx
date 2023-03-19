import React from 'react';
import TextContainer from './TextContainer';


interface InformationContainerProps{
  url:string,
  title:string,
  copyright:string,
  date:string,
  hdurl:string,
  explanation:string,
  media_type:string
}

const InformationContainer =  React.memo(({url,title,copyright, date,hdurl, explanation,media_type}:InformationContainerProps)=> {
  return (
    <div className='card '>
        <div className="image-container">
            {media_type==='image' ? (<img src={hdurl} alt="" />): (<iframe src={url}></iframe>)}
        </div>
        <div className='text-container'>
            <h2>{title}</h2>
            <h3>Date: {date}</h3>
            <TextContainer text={explanation}/>
            <br />
            {copyright ? (<span role='copyright'>&copy; {copyright}</span>): (<span>unknown copyright</span>)} 
        </div>
            
    </div>
  )
})

export default InformationContainer