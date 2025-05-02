import React from 'react'
import './Popup.css'

const Popup = (props) => {

  return (
    <div className="popup-container" id="popup-msg-init">
        <div className={`popup ${props.show ? 'show-popup' : ''}`} id="loading-popup">
            <div className="img-container"><img src={props.image} height={props.height} alt="popup"></img></div>
            <div className="message-container"><p className="msg">{props.status}</p></div>
            <button id="btn" onClick={props.close} style={props.style}>OK</button>
        </div>
        
    </div>
  )
}

export default Popup