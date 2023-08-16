import { useState } from 'react';

import Place from './components/Place';
import Itinerary from './components/Itinerary'
import MyLocations from './components/MyLocations';
import Instructions from './components/Instructions';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';

import './App.css'

import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

function App() {

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('');
  
  // Conditionally rendering the components
  const [showPlace, setShowPlace] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  // Handling authenticated users

  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      setShowItinerary(false);
      setShowPlace(true);
      setShowInstructions(false)
      setShowLocations(false);
      setPlace(search);
      setSearch('');
    }
  }

  const handleItinerary = (e, name, address, image, rating, types, numberOfDays) => {
      const placeInfo = {e, name, address, image, rating, types, numberOfDays};
      setSelectedPlace(placeInfo);
      setShowPlace(false)
      setShowItinerary(true);
      setShowInstructions(false);
      setShowLocations(false);
  }

  const handlePlace = () => {
    setShowItinerary(false);
    setShowInstructions(true);
    setShowPlace(false);
    setShowLocations(false);
  }

  const handleLocations = () => {
    setShowLocations(true);
    setShowItinerary(false);
    setShowInstructions(false)
    setShowPlace(false)
  }

  return (
    <>
      <Sidebar handlePlace={handlePlace} handleLocations={handleLocations}/>
      <main>
        <Place userPlace={place} show={showPlace} createItinerary={handleItinerary}/>
        <Itinerary placeInfo={selectedPlace} show={showItinerary}/>
        <MyLocations show={showLocations} />
        <Instructions show={showInstructions} />
        <form action="#" onSubmit={handleSubmit} className='get-place-form'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" onChange={handleChange} className='text-field' value={search} placeholder='Search for a location...' required/>
          <button type='submit' className='submit-button'>Search</button>
        </form>
      </main>

    </>
  )
}

export default App