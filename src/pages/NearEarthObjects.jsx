import useFetch from '../hooks/useFetch'
import {Header,Navigation,Error,Spinner, ScrollBTN} from '../components/index';


function NearEarthObjects() {
    const apikey = import.meta.env.VITE_NASA_PROJECT_API_KEY;
    let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apikey}`
    const {data,error, loading} = useFetch(url, 'Near-Earth-Objects')
    const nearEarthObjects = data?.near_earth_objects ?? []
    if(loading){
      return(
        <>
          <Navigation/>
          <Header text='Near Earth Objects'/>
          <p>please wait while the data is loading</p>
          <Spinner/>
        </>
      )
    }

    if(error)return <Error error={error}/>    
    return (   
        <div >
        <Navigation/>
        <Header text='Near Earth Objects'/>
            {nearEarthObjects && nearEarthObjects?.map((value,index) => {
                return(
                        <div className='list-container' key={value?.name_limited}>
                          <div className='title-container'>
                              <span className='number'>{index+1}. </span>
                              <h3><span>Name:</span> {value?.name_limited}</h3>
                          </div>
                          <div className='info-contianer'>
                            <p> <span>Is potentially hazardous asteroid:</span>   {value?.is_potentially_hazardous_asteroid?'Yes': 'no'}</p>
                            <p> <span>Estimated diameter :</span> {value?.estimated_diameter?.kilometers?.estimated_diameter_min.toFixed(2)} KM</p>
                            <p><span>Close approach date:</span> {value?.close_approach_data[value?.close_approach_data?.length-1]?.close_approach_date}</p>
                            <p> <span>First observation date:</span> {value?.orbital_data?.first_observation_date} </p>  
                            <p><span>Description:</span> {value?.orbital_data?.orbit_class?.orbit_class_description}</p>
                          </div>
                        </div>                
                      )})}
                    <ScrollBTN/>
            </div>
    )
}

export default NearEarthObjects