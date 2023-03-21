import{useState,useMemo,useEffect,useRef, useCallback, lazy, Suspense} from 'react';
import {Header,Navigation,Calendar,Error,Spinner} from '../components/index';
import useLocalStorage from '../hooks/useLocalStorage';

const ImageContainer = lazy (()=>import ('../components/ImageContainer'))

interface MarsRoverData {
  id:number,
  img_src:string,
  camera:{
    full_name:string
  },
  rover:{
    name:string
  },
  earth_date:string,


}



function MarsRover() {  
  const apikey:string = import.meta.env.VITE_NASA_PROJECT_API_KEY;
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const startingDate:string = '2023-03-08'
  const [startDate, setStartDate] = useState<string>(startingDate)
  const dateInputRef = useRef<HTMLInputElement>(null);
  let url:string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${startDate}&api_key=${apikey}`;
  const [dataCollection, setDataCollection]  = useLocalStorage<MarsRoverData[]>('Mars-Rover', [])
  const [loading, setLoading] = useState<Boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const next = useCallback((): void => {
    setCurrentIndex((currentIndex + 1) % dataCollection.length);
  }, [currentIndex, dataCollection]);

  const prev = useCallback(():void => {
    setCurrentIndex((currentIndex - 1 + dataCollection.length) % dataCollection.length);
  } ,[currentIndex, dataCollection]);
  const fetchData = useMemo(()=> async () => {
    setLoading(()=>true);
    try{
      const res = await fetch(url)
      const data = await res.json();
      if(data.error)setError(data.error);
      else if(Object.keys(data).length>0){
      
        const images = Object.values<MarsRoverData[]>(data)[0].slice(0,30).reverse();
        setDataCollection(()=>[...images]);
      }
    }
    catch(err:any){
        setError(()=>err);
        console.error(err)
    }
    finally{
        setLoading(false)
    }
  },[url]);

  useEffect(()=>{
    if(!dataCollection.length || startDate !== dataCollection[0].earth_date){
      fetchData()
    }
    },[startDate, dataCollection.length])
    
    if(loading && !dataCollection.length){
      return(
        <>
          <Navigation/>
          <Header text='Mars Rover'/>
          <p>please wait while the data is loading</p>
          <Spinner/>
        </>
      )
    }
    if(error)return <Error error={error}/>
    return (
      <>
      <Navigation/>
          <Header text='Mars Rover'/>
          <div className='box calendar'>
            <span>Pick a date:</span>    
            <Calendar startDate={startDate} min='2017-01-01' max={startingDate} dateInputRef={dateInputRef} handleChange={(value:string)=>setStartDate(value)}/>
          </div>
       
          <div className='main-container mars'>
            {dataCollection && dataCollection.map((value:MarsRoverData, index:number) => (   
              <div className={index===currentIndex?'card active':'card'} key={value.id}>
                  <Suspense fallback={<Spinner/>}>
                    <ImageContainer imageSrc={value?.img_src} imagedesc={`Mars rover : ${value?.camera.full_name}`}/>
                  </Suspense>
                  
                  <div className='text-container'>
                      <h2>{value?.rover?.name}</h2>
                      <h3>Date: {value?.earth_date}</h3>
                      <p>{value.camera?.full_name}</p>
                  </div>
                  <button className='prev' onClick={prev}>&#10094;</button>
                  <button className='next' onClick={next}>&#10095;</button>
              </div>
          ))}
      </div>
        {loading ? <Spinner/> : null} 
      </>
      
    )
}

export default MarsRover