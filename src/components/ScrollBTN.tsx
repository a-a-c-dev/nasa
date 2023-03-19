import {useState, useEffect} from 'react'

function ScrollBTN() {
    const [visible,setVisible] = useState<boolean>(false) 
      
      const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
      useEffect(()=>{
        window.addEventListener('scroll', () => {    
            const scrolled = document.documentElement.scrollTop;
            scrolled > 300? setVisible(true):setVisible(false);
        });

        return ()=> window.removeEventListener('scroll', ()=>{} )
      },[])
      
  return (
    <button className='scroll' style={{display: visible ? 'inline' : 'none'}} onClick={scrollToTop} >
      &#10161;
   </button>
  )
}

export default ScrollBTN