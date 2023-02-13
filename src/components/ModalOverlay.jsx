
import React,{useState} from 'react'
import  ReactDOM from 'react-dom';

const ModalOverlay = React.memo(({ toggle, content }) => {
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
  
  export const Modal = ({ children }) => (
    ReactDOM.createPortal(
      <div className="modal-overlay">
        <div className="modal">
          {children}
        </div>
      </div>
      ,
      document.getElementById('modal-root')
    )
  );



export default ModalOverlay;