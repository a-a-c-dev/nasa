import{useState,useMemo,useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {Header,Navigation,Error,Spinner,ScrollBTN,TextContainer,Modal, ModalOverlay} from '../components/index';

interface ProjectsData{
  code?: number,
  project:Project,
  error:string
}
interface Project{
  title:string,
  benefits:string
  leadOrganization:{
    organizationName:string,
    city:string,
    country:{}
  }
  otherOrganizations:{
    organizationName:string
  }
  organizationName:string
  destinationType:string[],
  description:string,
  endDate:string,
  startYear:string,
  status:string,
  projectId:number
}

function NasaProjects() {

    const [dataCollection, setDataCollection]  = useLocalStorage<Project[]>('NASA-Project', [])
    const [loading, setLoading] = useState<boolean|null>(null);
    const [error, setError] = useState<string|null>(null);
    
  
    const fetchData = useMemo(()=> async () => {
      setLoading(true)
        try{
          const res = await fetch('/getNasaProjectsData')
          if(!res.ok) {
            setError('something happend');
            return
          }  
          const projectsData:ProjectsData[] = await res.json() 
          if(projectsData[0].error)setError(projectsData[0].error)
          if(projectsData.length){
            const projects:Project[] = projectsData.map(project=> project.project)
            setDataCollection(()=>[...projects])}
        }
        catch(err:any){
            setError(()=>err)
        }
        finally{
          setLoading(false)
        }
        
      },[]);
    useEffect(()=>{
      if(!(dataCollection.length>0)){
        fetchData()
      }
      },[dataCollection.length])
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
             {dataCollection.length&& dataCollection?.map((project:Project) => {
              return(
                <ModalOverlay
                key={project?.projectId}
                toggle={show =>      
                  <div className='card project'  onClick={show}>
                    
                    <span  className='project-status'>{project.status}</span>
                    <h2 className='project-title'>{project?.title}</h2>
                    <p  className='project-org'>{project?.leadOrganization?.organizationName ?project?.leadOrganization?.organizationName : project?.otherOrganizations?.organizationName ?project?.otherOrganizations?.organizationName : 'NASA' }</p>
                    <p  className='project-desc'>{project.benefits}</p>
                    {/*<TextContainer text={project?.description}/>*/ }
                  </div>
                  
                  }
                  content={hide => (
                    <Modal>
                       <div 
                          className="projects-page show card" 
                          onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                hide()
                            }
                          }}
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h2 className="modal-title">{project.title}</h2>
                              <button className="close-btn" onClick={()=>hide()}>×</button>
                            </div>
                            
                            <div className="modal-body">
                              <div className="info-grid">
                                <div className="info-item">
                                  <div className="info-label">Project ID</div>
                                  <div className="info-value">{project.projectId}</div>
                                </div>
                                <div className="info-item">
                                  <div className="info-label">Status</div>
                                  <div className="info-value">{project.status}</div>
                                </div>
                                <div className="info-item">
                                  <div className="info-label">Start Year</div>
                                  <div className="info-value">{project.startYear}</div>
                                </div>
                                <div className="info-item">
                                  <div className="info-label">End Date</div>
                                  <div className="info-value">{project.endDate}</div>
                                </div>
                                <div className="info-item">
                                  <div className="info-label">Lead Organization</div>
                                  <div className="info-value">{project?.leadOrganization?.organizationName ?project?.leadOrganization?.organizationName : project?.otherOrganizations?.organizationName ?project?.otherOrganizations?.organizationName : 'NASA' }</div>
                                </div>
                                <div className="info-item">
                                  <div className="info-label">Destination</div>
                                  <div className="info-value">{project.destinationType.join(', ')}</div>
                                </div>
                              
                              </div>

                              <div className="description-section">
                                <h3>Benefits</h3>
                                <p>{project.benefits}</p>
                              </div>

                              <div className="description-section">
                                <h3>Description</h3>
                                <TextContainer text={project.description}/>
                              </div>

                            </div>
                          </div>
                        </div>
      
                      
                      
                    </Modal>
                  )}
                />
              )
            })}
            </div>
            <ScrollBTN/>
        </>
    )
}

export default NasaProjects