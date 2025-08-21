import {Suspense,lazy } from 'react';
import {Spinner} from './components/index';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
const MarsRover = lazy (()=>import('./pages/MarsRover')) ;
const PictureOfTheDay = lazy (()=>import('./pages/PictureOfTheDay')) ;
const ApolloLaunch = lazy (()=>import('./pages/ApolloLaunch')) ;
const NearEarthObjects = lazy (()=>import('./pages/NearEarthObjects')) ;
const NasaProjects = lazy (()=>import('./pages/NasaProjects')) ;
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route index element={     
              <Suspense  fallback={<Spinner/>}>
                <PictureOfTheDay />      
              </Suspense>}/>
            <Route path='MarsRover' element={
              <Suspense  fallback={<Spinner/>}>
                <MarsRover />      
              </Suspense>} />
            <Route path='ApolloLaunch' element={
              <Suspense  fallback={<Spinner/>}>
                <ApolloLaunch />      
              </Suspense>} />
            <Route path='NearEarthObjects' element={
              <Suspense fallback={<Spinner/>}>
                <NearEarthObjects/>
              </Suspense>}/>
            <Route path='projects' element={
              <Suspense fallback={<Spinner/>}>
                <NasaProjects/>
              </Suspense>}/>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App