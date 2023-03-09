import {useEffect,useState, useMemo} from 'react';
import useLocalStorage from './useLocalStorage';

function useFetch(url,storageKey) {
    const [data, setData] = useLocalStorage(storageKey,null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const fetchData = useMemo(()=> async () => {
        setLoading(true)
        try{
          const res = await fetch(url)
          const data = await res.json();
          if(data.error){
            setError(data.error)
          }
          setData(()=>data) 

        }
        catch(err){
            setError(()=>err);
            console.error(err)
        }
        finally{
            setLoading(false)
        }
        
      },[url]);

      useEffect(()=>{
        let isMounted = true;
        if(isMounted){
          fetchData()
        }
        return () => {
          isMounted = false
        }
        
      },[url])
          

    return {data, loading, error} 
}

export default useFetch