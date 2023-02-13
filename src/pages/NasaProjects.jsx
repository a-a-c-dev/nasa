import{useState,useMemo,useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {Header,Navigation,Error,Spinner,ScrollBTN,TextContainer} from '../components/index';


function NasaProjects() {
    const apikey = import.meta.env.VITE_NASA_PROJECT_API_KEY;

    const [dataCollection, setDataCollection]  = useLocalStorage('NASA-Project', [])
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
    const urls = [
      `https://api.nasa.gov/techport/api/projects/10002?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/10000?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/10001?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17791?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17792?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17794?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17795?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17797?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17798?api_key=${apikey}`,
      `https://api.nasa.gov/techport/api/projects/17780?api_key=${apikey}`
   ]
    const fetchData = useMemo(()=> async () => {
      setLoading(true)
        try{
          const res = await Promise.all(urls.map(url => fetch(url)))
          const projects = await Promise.all(res.map(value=> value.json())) 
          if(projects.error)setError(projects.error)
          else if(projects.length){
            setDataCollection(()=>[...projects])}
        }
        catch(err){
            setError(()=>err)
            console.error(err)
        }
        finally{
          setLoading(false)
        }
        
      },[]);
    useEffect(()=>{
      if(!dataCollection.length>0 ){
        fetchData()
      }
      },[dataCollection])
      if(error)return <Error error={error}/>

      if(loading && dataCollection.length===0){
        return(
          <>
            <Navigation/>
            <Header text='NASA Projects'/>
              <p>please wait while the data is loading</p>
            <Spinner/>
          </>
        )
      }
   return( 
    <>
        <Navigation/>
        <Header text='NASA Projects'/>
        <div className='project-container'>
            {dataCollection.length&& dataCollection?.map((value) => {
              return  value.code === 404? null : 
              ( <div className='card project' key={value.project?.title}>
                <h2><span>Project title:</span> <br/> {value.project?.title}</h2>
                <h3><span>organization Name:</span>  {value.project?.leadOrganization?.organizationName}</h3>
                  <div className='places-container'>
                  {value.project.destinations? ( 
                    <>
                      <span>Places :</span>
                      <ul>
                        { value.project.destinations?.map(destination =>(<li key={destination?.description}>{destination?.description}</li>) )}
                      </ul>
                    </>) 
                    : null}
                </div>
                <TextContainer text={value.project?.description}/>
              </div>
              )

            }
               
                  
            )}
            <ScrollBTN/>
    </div>
    </>
    
   )
}

export default NasaProjects