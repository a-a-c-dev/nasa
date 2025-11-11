import {useEffect,useState, useCallback} from 'react';
import useLocalStorage from './useLocalStorage';

function useFetch<T>(url:string,storageKey:string):{
  data?: T | null,
  loading: boolean| null,
  error : string | null
}{
    const [data, setData] = useLocalStorage<T|any>(storageKey, null);
    const [loading, setLoading] = useState<boolean|null>(null);
    const [error, setError] = useState<string|null>(null);
    const fetchData = useCallback(()=> async () => {
        setLoading(true)
        try{
          const res = await fetch(url)
          const data = await res.json();
          if(data.error){
            setError(data.error)
          }
          setData(()=>data as T) 

        }
        catch(err:any){
            setError(()=>err.message);
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