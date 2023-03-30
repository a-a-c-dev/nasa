import{useState,useMemo,useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {Header,Navigation,Error,Spinner,ScrollBTN,TextContainer} from '../components/index';

interface Projects{
  code?: number,
  project:Project,
  error:string
}
interface Project{
  title:string,
  leadOrganization:{
    organizationName:string
  }
  destinations:{
    description:string
  }[],
  description:string
}


function NasaProjects() {

    const [dataCollection, setDataCollection]  = useLocalStorage<Projects[]>('NASA-Project', [])
    const [loading, setLoading] = useState<boolean|null>(null);
    const [error, setError] = useState<string|null>(null);
    
  
    const fetchData = useMemo(()=> async () => {
      setLoading(true)
        try{
          const res = await fetch('/getNasaProjectsData')
          const projects:Projects[] = await res.json() 
          if(projects[0].error)setError(projects[0].error)
          else if(projects.length){
            setDataCollection(()=>[...projects])}
        }
        catch(err:any){
            setError(()=>err)
            console.error(err)
        }
        finally{
          setLoading(false)
        }
        
      },[]);
    useEffect(()=>{
      if(!(dataCollection.length>0)){
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
            {dataCollection.length&& dataCollection?.map((value:Projects) => {
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