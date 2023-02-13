import{useState,useMemo,useEffect,useRef, useCallback, lazy, Suspense} from 'react';
import {Header,Navigation,Calendar,Error,Spinner} from '../components/index';
import useLocalStorage from '../hooks/useLocalStorage';

const ImageContainer = lazy (()=>import ('../components/ImageContainer'))

function MarsRover() {  
  const apikey = import.meta.env.VITE_NASA_PROJECT_API_KEY;
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const startingDate = day-10>0 ?
    `${year}-${month+1<12?month+1>=10?month+1:`0${month+1}`:'01'}-${day>10?day-10>=10?day-10:`0${day-10}`:'01'}`
    :`${month>=0?year:year-1}-${month===0?12:month<10?`0${month}`:month}-${month>=0?20 :day>10?day-10>=10?day-10:`0${day-10}`:'01'}`;
  const [startDate, setStartDate] = useState(startingDate)
  const dateInputRef = useRef(null);
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${startDate}&api_key=${apikey}`;
  const [dataCollection, setDataCollection]  = useLocalStorage('Mars-Rover', [])
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next =useCallback( () => {
    setCurrentIndex((currentIndex + 1) % dataCollection.length);
  });
  const prev =useCallback(() => {
    setCurrentIndex((currentIndex - 1 + dataCollection.length) % dataCollection.length);
  });
  const fetchData = useMemo(()=> async () => {
    setLoading(()=>true);
    try{
      const res = await fetch(url)
      const data = await res.json();
      if(data.error)setError(data.error);
      
      else if(data){
        const images = Object.values(data)[0].slice(0,30).reverse();
        setDataCollection(()=>[...images]);
      }
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
    if(!dataCollection.length || startDate !== dataCollection[0].earth_date){
      fetchData()
    }
    },[startDate, dataCollection])
    
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
            <Calendar value={startDate} min='2017-01-01' max={startingDate} dateInputRef={dateInputRef} handleChange={(value)=>setStartDate(value)}/>
          </div>
       
          <div className='main-container mars'>
            {dataCollection && dataCollection.map((value, index) => (   
              <div className={index===currentIndex?'card active':'card '} key={value.id}>
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