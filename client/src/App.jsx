import { useState, useEffect } from 'react'
import './App.css'
import Weather from '../component/Weather';
import Navbar from '../component/Navbar';

function App() {

  const [isAllowed, setAllowed] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  let message = null

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        message = "Location not allowed";
      }
    }
    
    function showPosition(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setAllowed(true);
    }

    getLocation();
  }, []);

  return (
    <div className='container'>
      <div className='navbar'>
        <Navbar />
      </div>
      <>
        {
          isAllowed ?
          <>
            <Weather
              latitude={latitude}
              longitude={longitude}
            />
          </>
          :
          <div className='content'>
            {message && <p>{message}</p> }
          </div>
        }
      </>
    </div>
  )
}

export default App