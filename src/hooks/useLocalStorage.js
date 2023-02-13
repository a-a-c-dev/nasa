import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, prevState) => {
    const [value, setValue] = useState( ()=> {
      if(typeof window ==='undefined') return prevState
      return JSON.parse(localStorage.getItem(storageKey)) ?? prevState
    }
      
    );
    useEffect(() => {
      if(typeof window !== 'undefined'){
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    }, [value, storageKey]);
  
    return [value, setValue];
  };
export default useLocalStorage 