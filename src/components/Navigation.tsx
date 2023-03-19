import React,{useState} from 'react'
import {Link } from 'react-router-dom';
import NasaIcon from  '../assets/nasa.svg';

const Navigation =React.memo( () => {
  const [isActive, setISActive] = useState<boolean>(false)
  return (
    <nav className='navbar'>
      <div className='icon-container'>
        <img src={NasaIcon} alt="Nasa icon" />
      </div>
      <ul className={isActive?'nav-menu active':'nav-menu'}>
        <li className='nav-item'><Link  className='nav-link' to="/">Picture Of The Day</Link ></li>
        <li className='nav-item'><Link className='nav-link' to="/MarsRover">Mars Rover</Link ></li>
        <li className='nav-item'><Link className='nav-link' to="/ApolloLaunch">Apollo Launch</Link ></li>
        <li className='nav-item'><Link className='nav-link' to="/NearEarthObjects">Near Earth Objects</Link ></li>
        <li className='nav-item'><Link className='nav-link' to="/projects">Nasa Projects</Link ></li>
      </ul>
      <button className={isActive?"hamburger active":"hamburger"} onClick={()=>setISActive(!isActive)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  )
})

export default Navigation