import { useState } from 'react';

import Place from './components/Place';
import Itinerary from './components/Itinerary'

import './App.css'

function App() {

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

// Conditionally rendering the components
  const [showPlace, setShowPlace] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState({});

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
  }

  const handlePlace = () => {
    setPlace('');
    setShowItinerary(false);
    setShowInstructions(true)
    setShowPlace(false)
  }

  return (
    <>
        <div className="sidebar">
          <h1><span className="ai">AI</span> <span className="letter-t">T</span>ravels</h1>
          <div className="gpt-buttons">
            <button className='search-place gpt-btn' onClick={handlePlace}><i className="fa-regular fa-map"></i>Instructions</button>
            <button className='gpt-btn'><i className="fa-solid fa-heart"></i>My Locations</button>
          </div>
          <div className="logo">
            <img className='world' src="/logo.png" alt="3d world map" />
          </div>
        </div>

      <main>
        <Place user_place={place} show={showPlace} createItinerary={handleItinerary}/>
        <Itinerary place_info={selectedPlace} show={showItinerary}/>
        {showInstructions && 
        <div className='instructions'>
          <ol>
            <li>Search for a specific place or location</li>
            <li>Select the place you would like to visit</li>
            <li>Generate an itinerary</li>
            <li>In order to start again, simply click on Search Place</li>
          </ol>
        </div>}

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