import { useState, useEffect } from 'react';

import Place from './components/Place';
import Itinerary from './components/Itinerary'

import './App.css'

function App() {

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('');

// Conditionally rendering the components
  const [showPlace, setShowPlace] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowItinerary(false);
    setShowPlace(true);
    setPlace(search);
    setSearch('');
  }

  const handleSelect = (e, name, address, image, rating, types) => {
    if (e.target.innerText === 'Select') {
      const placeInfo = {name, address, image, rating, types}
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
    setShowPlace(false)
    setShowItinerary(true);
  }
  const handlePlace = () => {
    setPlace('');
    setShowItinerary(false);
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

        <form action="#" onSubmit={handleSubmit} className='get-place-form'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" onChange={handleChange} className='text-field' value={search} placeholder='Search for a location...'/>
          <button type='submit' className='submit-button'>Search</button>
        </form>

      </main>

    </>
  )
}

export default App
