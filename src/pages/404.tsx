import React from 'react';
import { useNavigate } from 'react-router-dom';

const Custom404 = () => {
    const navigate = useNavigate();

  return (
    
        <div className='page-404'>
                <div className="error-code">404</div>
                <h1>Page Not Found</h1>
                <p>Sorry, this page doesn't exist. Please check the URL or return to the homepage.</p> 
                <button onClick={()=> navigate('/')}>Main page</button>
        </div>
        
     )
}

export default Custom404
