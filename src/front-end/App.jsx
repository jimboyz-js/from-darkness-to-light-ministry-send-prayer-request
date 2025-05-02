import React, {useState} from 'react'
import Popup from './Popup.jsx';
import './App.css'
import loadingGif from './assets/loading.gif'
import checkIco from './assets/check.ico'
import closeIco from './assets/close.ico'

/*
 * @author jimBoYz Ni ChOy!!!
 * May 02, 2025 FRI.
 */

const App = () => {
  const options = { 
    year: 'numeric', month: 'long', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit', 
    hour12: true 
  };

  var date = new Date();
  const [emailData, setEmailData] = useState({
    date,
    dateTime: new Intl.DateTimeFormat('en-PH', options).format(date),
    name: "",
    email: "",
    subject: "Prayer Request",
    body: "",
  });

  const [status, setStatus] = useState("");
  const [holder, setHolder] = useState("Please send your prayer request, we are here to pray with.")
  const [description, setDescription] = useState('Send your Prayer Request')
  const [showPopup, setShowPopup] = useState(false)
  const [icon, setIcon] = useState(loadingGif)
  const [style, setStyle] = useState({
    display:'none',
  })
  const [height, setHeight] = useState(null)

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });

    if(e.target.value === 'Prayer Request') {
      setHolder('Please send your prayer request, we are here to pray with.')
      setDescription('Send your Prayer Request')
    } else if(e.target.value === 'Bible Question') {
      setHolder('What is your bible question?')
      setDescription('Bible Question')
    } else if(e.target.value === 'Suggestion') {
      setHolder('Please tell us about your suggestion...')
      setDescription('Suggestion')
    } else if(e.target.value === 'Other') {
      setHolder('Say something...')
      setDescription('')
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    setStatus("Sending...");
    
    try {
      const res = await fetch("https://from-darkness-to-light-ministry-send.onrender.com/send-prayer-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({emailData}),
      });

      const data = await res.json();
      if (res.ok) {
        if(description === 'Send your Prayer Request') {
          setStatus("Your prayer request is sent successfully!");
        } else if(description === 'Bible Question') {
          setStatus('Your question(s) is sent successfully!');
        } else if(description === 'Suggestion') {
          setStatus('Your suggestion message is sent successfully!')
        } else {
          setStatus('Message sent successfully!')
        }
        
        setIcon(checkIco);
        setStyle({
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })
        setHeight('50px')

      } else {
        setStatus("Failed to send.");
        setIcon(closeIco);
        setStyle({
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })
        setHeight('50px')
      }

    } catch (err) {
      console.error(err);
      setStatus("Error occurred.");
      setIcon(closeIco)
      setStyle({
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })
      setHeight('50px')
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
    setIcon(loadingGif);
    setStyle({
      display:'none',
    })
    setHeight(null);
  }

  return (
    <>
      <div className='container'>
        <h3 className='desc'>{description}</h3>
        <form onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={emailData.name} onChange={handleChange} placeholder='Your name' required />
          <label htmlFor="email">Email</label>
          <input type="email" name='email' value={emailData.email} onChange={handleChange} placeholder='your-email@mail.com' required />
          <label htmlFor="subject">Subject</label>
          <select name="subject" id="subject" value={emailData.subject} onChange={handleChange} >
          <option value="Prayer Request">Prayer Request</option>
            <option value="Bible Question">Bible Question</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="body">Message</label>
          <textarea name="body" id="msg" value={emailData.text} onChange={handleChange} placeholder= {holder} cols="30" rows="10" required></textarea>
          <input type="submit" value= "Send"/>
        </form>
      </div>
      { showPopup && <Popup show = {showPopup} status = {status} image = {icon} style = {style} height = {height} close = {handleClosePopup} />}
    </>
  )
}

export default App