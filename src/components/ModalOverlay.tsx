
import React,{useState, ReactNode} from 'react'
import  ReactDOM from 'react-dom';

interface ModalOverlayProps{
  toggle:(show: ()=> void) => ReactNode,
  content:(hide: ()=> void) => ReactNode
}

const ModalOverlay = React.memo(({ toggle, content }:ModalOverlayProps) => {
    const [isShown, setIsShown] = useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);
    return (
      <>
        {toggle(show)}
        {isShown && content(hide)}
      </>
    );
  })
  
  export const Modal = ({ children}:{children: ReactNode}) => {
    
   const targetElement = document.getElementById('modal-root');
   if(!targetElement)return null

   return ReactDOM.createPortal(
      <div className="modal-overlay">
        <div className="modal">
          {children}
        </div>
      </div>
      ,
    targetElement
    
  );

}


export default ModalOverlay;