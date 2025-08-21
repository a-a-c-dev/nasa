import {useState, useEffect ,useMemo, useRef ,Suspense,lazy } from 'react';
import {Header,Navigation,Error,Spinner,ScrollBTN, NotFound,Calendar,InputText} from '../components/index';
import useLocalStorage from '../hooks/useLocalStorage';
const InformationContainer = lazy (()=>import('../components/InformationContainer')) ;

interface PictureOfTheDayProps{
  date:string,
  url:string,
  title:string,
  copyright:string,
  hdurl:string
  explanation:string,
  media_type:string
}

function PictureOfTheDay() {

    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    const endDate = `${year}-${month+1<12?month+1:1}-${day>=10?day:`0${day}`}`
    const [autoSearch, setAutoSearch] = useState<string>('')
    const [startDate, setStartDate] = useState<string>(day===1? `${year}-${month<12?month:1 }-${day>10?day-10:1}`: `${year}-${month+1<12?month+1:1 }-${day>10?(day-10>=10?day-10:`0${day-10}`):`01`}`)
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [dataCollection, setDataCollection]  = useLocalStorage<PictureOfTheDayProps[]>('NASA-Picture-Of-The-Day', [])
    const [loading, setLoading] = useState<boolean|null>(null);
    const [error, setError] = useState<string|null>(null);
    const filteredData:PictureOfTheDayProps[] = dataCollection.filter((value:PictureOfTheDayProps) => value.title.toLowerCase().includes(autoSearch.toLowerCase()));
    const fetchData = useMemo(()=> async () => {
      setLoading(()=>true)
      try{
        
        const res = await fetch(`/.netlify/functions/getPictureOfTheDayData?startDate=${startDate}&endDate=${endDate}`)
        console.log('1',res);
        if(!res.ok) {
          console.log('2',res);
          setError('something happend');
          return
        }     
                console.log(res.body, '3')

        const data = await res.json();
        console.log(data, '4')
        if(data.error){
          console.log(data.error)
          setError(()=>data.error);
          
        }
        else if(data){
          setDataCollection(()=>[...data].reverse());
        }
        
      }
      catch(err:any){
        setError(()=>err);
        console.error(err)
      }
      finally{
          setLoading(()=>false)
      }
      
    },[startDate]);
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
            <Calendar startDate={startDate} min='2022-10-01' max={`${year}-${month+1<10?`0${month+1}`:month+1}-${day<10?`0${day}`:day}`} dateInputRef={dateInputRef} handleChange={(value:string)=>setStartDate(()=>value)}/>
          </div>

          <InputText autoSearch={autoSearch}  handleChange={(value: string)=>setAutoSearch(value)}/>
        </div>
        <div className='main-container'>
                {
                  !autoSearch ?  (
                    dataCollection && dataCollection?.map((data:PictureOfTheDayProps)=>(
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


