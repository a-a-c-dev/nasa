import {useState} from 'react';


function TextContainer({text}:{text:string}) {
    const [isReadMoreShown,setIsReadMoreShown]  = useState<boolean>(false)
    return (
            <>
               {isReadMoreShown? 
                <div className='description'>
                <p> {text}</p>
                <button onClick={()=> setIsReadMoreShown(!isReadMoreShown)}>Read less</button>
                </div>
                : 
                <div className='description'>
                <p>{text.substr(0,300)}</p>
                <button onClick={()=> setIsReadMoreShown(!isReadMoreShown)}>Read more</button>
                </div>  }
            </>
    )
}

export default TextContainer