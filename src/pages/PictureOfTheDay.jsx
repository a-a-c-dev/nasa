import {useState, useEffect ,useMemo, useRef ,Suspense,lazy } from 'react';
import {Header,Navigation,Error,Spinner,ScrollBTN, NotFound,Calendar,InputText} from '../components/index';
import useLocalStorage from '../hooks/useLocalStorage';
const InformationContainer = lazy (()=>import('../components/InformationContainer')) ;



function PictureOfTheDay() {

    const apikey = import.meta.env.VITE_NASA_PROJECT_API_KEY;
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    const [autoSearch, setAutoSearch] = useState('')
    const [startDate, setStartDate] = useState(day===1? `${year}-${month<12?month:1 }-${day>10?day-10:1}`: `${year}-${month+1<12?month+1:1 }-${day>10?day-10:1}`)
    const dateInputRef = useRef(null);
    const [dataCollection, setDataCollection]  = useLocalStorage('NASA-Picture-Of-The-Day', [])
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&start_date=${startDate}&end_date=${year}-${month+1<12?month+1:1}-${day}`;
    const filteredData = dataCollection.filter(value => value.title.toLowerCase().includes(autoSearch.toLowerCase()));
    const fetchData = useMemo(()=> async () => {
      setLoading(()=>true)
      try{
        const res = await fetch(url)
        const data = await res.json();
        if(data.error)setError(()=>data.error);
        else if(data){
          setDataCollection(()=>[...data].reverse());
        }
        
      }
      catch(err){
        setError(()=>err);
        console.error(err)
      }
      finally{
          setLoading(()=>false)
      }
      
    },[url]);
    useEffect(()=>{
      if(!dataCollection.length || startDate!==dataCollection[dataCollection.length-1]?.date){
        fetchData()
      }
    },[dataCollection.length,startDate])

    if(loading && !dataCollection.length){
      return(
        <>
          <Navigation/>
          <Header text='NASA picture of the day'/>
          <p>please wait while the data is loading</p>
          <Spinner/>
        </>
      )
    }
    
    if(error)return <Error error={error}/>
  
    return (
      <>
      <Navigation/>
      <Header text='NASA picture of the day'/>
        <div className='navigation-container'>
          <div className='box calendar'>
            <span>Pick a starting date:</span>    
            <Calendar value={startDate} min='2022-10-01' max={`${year}-${month+1<10?`0${month+1}`:month+1}-${day<10?`0${day}`:day}`} dateInputRef={dateInputRef} handleChange={(value)=>setStartDate(value)}/>
          </div>

          <InputText value={autoSearch}  handleChange={(value)=>setAutoSearch(()=>value)}/>
        </div>
        <div className='main-container'>
                {
                  !autoSearch ?  (
                    dataCollection && dataCollection?.map(data=>(
                      <Suspense key={data?.date} fallback={<Spinner/>}>
                        <InformationContainer 
                          url = {data?.url} 
                          title ={data?.title} 
                          copyright={data?.copyright} 
                          date ={data?.date}
                          hdurl ={data?.hdurl}
                          explanation={data?.explanation} 
                          media_type={data?.media_type}
                        />      
                      </Suspense>
                    )))
                    :(
                      !filteredData.length? 
                            <NotFound/>
                          : 
                          filteredData && filteredData.map(data=>(
                          <Suspense key={data.date} fallback={<Spinner/>}>
                            <InformationContainer 
                              url = {data?.url} 
                              title ={data?.title} 
                              copyright={data?.copyright} 
                              date ={data?.date}
                              hdurl ={data?.hdurl}
                              explanation={data?.explanation} 
                              media_type={data?.media_type}
                            />                            
                          </Suspense>    
                    )
                  ))
                }
                           
        </div>
        
        {loading ? <Spinner/> : null} 
        <ScrollBTN/>     
      </>
      
    )
  }

export default PictureOfTheDay


