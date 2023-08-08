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

  const handleSelect = (e, name, address, image, rating, types, numberOfDays) => {
    if (e.target.innerText === 'Select') {
      const placeInfo = {name, address, image, rating, types, numberOfDays}
      setSelectedPlace(placeInfo);
      e.target.innerText = 'Selected';
      e.target.classList.add('selected');
    } else if (e.target.innerText === 'Selected') {
      e.target.classList.remove('selected');
      e.target.innerText = 'Select';
      setSelectedPlace('')
    }
  }

  const handleItinerary = () => {
    if (selectedPlace.name) {
      setShowPlace(false)
      setShowItinerary(true);
      setShowInstructions(false);
    } else {
      console.log('nope')
    }
  }
  const handlePlace = () => {
    setPlace('');
    setShowItinerary(false);
    setShowInstructions(true)
  }

  return (
    <>
        <div className="sidebar">
          <h1><span className="ai">AI</span> <span className="letter-t">T</span>ravels</h1>
          <div className="gpt-buttons">
            <button className='create-itinerary gpt-btn' onClick={handleItinerary}>Create Itinerary</button>
            <button className='search-place gpt-btn' onClick={handlePlace}>Search Place</button>
            <button className='gpt-btn'>Placeholder</button>
          </div>
        </div>

      <main>
        {showPlace && <Place user_place={place} selectFunction={handleSelect}/>}
        {showItinerary && <Itinerary place_info={selectedPlace}/>}
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