import useFetch from '../hooks/useFetch';
import {Header,Navigation,ImageContainer,Error,Spinner, Modal, ModalOverlay} from '../components/index';


let url= "https://images-api.nasa.gov/search?q=apollo+11...&page=1"

interface Fetch{
  data: Images[],
  loading: boolean| null,
  error : string | null
}

interface Images{
  links:{
    0:{
      href:string
    }
  }
  data:{
    0:{
      date_created:string,
      title:string,
      description:string,
      nasa_id:string
    }
    
  }
  
} 

function ApolloLaunch() {
  const {data,error, loading} = useFetch<Fetch>(url, 'Apollo-Launch')
  const images:Images[] = data ? Object.values(data)[0].items.slice(0,20) : []
  
  if(loading){
    return(
      <>
        <Navigation/>
        <Header text='Apollo Launch'/>
          <p>please wait while the data is loading</p>
        <Spinner/>
      </>
    )
  }
  
  if(error)return <Error error={error}/>

  return (   
    <>
    <Navigation/>
    <Header text='Apollo Launch'/>
    <div className='main-container apollo'>  
            {images && images?.map((value:Images) => (
                value?.links?(
                         <ModalOverlay
                          key={`${value.data[0].title} - ${value.data[0].nasa_id}`}
                          toggle={show =>         
                          <div className='card' onDoubleClick={()=> show()} >
                              <ImageContainer imageSrc={value?.links[0]?.href} imagedesc={value?.data[0]?.description}/>
                              <div className='info-container'>
                                <h3>date: {value?.data[0]?.date_created.slice(0,10)}</h3>
                                <h2>title: {value?.data[0]?.title.substr(0,50)}</h2>
                                <p>description: {value?.data[0]?.description.substr(0,100)}</p>
                              </div>
                              <span>double click to see more</span>

                          </div>
                          }
                          content={hide => (
                                <Modal>
                                  <div className='card'> 
                                      <button className='close-btn' onClick={hide}>X</button>
                                      <ImageContainer imageSrc={value?.links[0]?.href} imagedesc={value?.data[0]?.description}/>
                                      <div className='info-container'>
                                        <h3>date: {value?.data[0]?.date_created.slice(0,10)}</h3>
                                        <h2>title: {value.data[0]?.title}</h2>
                                        <p>description: {value?.data[0]?.description}</p>
                                      </div>                    
                                  </div>
                                    
                               </Modal>
                          )}
                    />
                                
                ): null
                
            ))}
          
    </div>
    </>
     
  )
}

export default ApolloLaunch


