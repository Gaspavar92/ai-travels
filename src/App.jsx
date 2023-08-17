import { useState } from 'react';

import Place from './components/Place';
import Itinerary from './components/Itinerary'
import MyLocations from './components/MyLocations';
import Instructions from './components/Instructions';
import Sidebar from './components/Sidebar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserDetails from './components/UserDetails';

import './App.css'

function App() {

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('');
  
  // Conditionally rendering the components
  const [showPlace, setShowPlace] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  // Showing sign up or sign in dynamically

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Setting user info from authentication

  const [user, setUser] = useState(null);

  const getUserInfo = (userInfo) => {
    setUser(userInfo)
  };

  // Defining functions to dynamically render components

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      setShowItinerary(false);
      setShowPlace(true);
      setShowInstructions(false)
      setShowLocations(false);
      setShowSignUp(false);
      setShowSignIn(false);
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
      setShowSignUp(false);
      setShowSignIn(false);
  }

  const handlePlace = () => {
    setShowItinerary(false);
    setShowInstructions(true);
    setShowPlace(false);
    setShowLocations(false);
    setShowSignUp(false);
    setShowSignIn(false);
  }

  const handleLocations = () => {
    setShowLocations(true);
    setShowItinerary(false);
    setShowInstructions(false)
    setShowPlace(false)
    setShowSignUp(false);
    setShowSignIn(false);
  }

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setShowLocations(false);
    setShowItinerary(false);
    setShowInstructions(false)
    setShowPlace(false)
  };

  const handleSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
    setShowLocations(false);
    setShowItinerary(false);
    setShowInstructions(false)
    setShowPlace(false)
  };

  return (
    <>
      <Sidebar handlePlace={handlePlace} handleLocations={handleLocations} handleSignUp={handleSignUp} handleSignIn={handleSignIn}/>
      <UserDetails getUserInfo={getUserInfo}/>

      <main>
        <Place userPlace={place} show={showPlace} createItinerary={handleItinerary}/>
        <Itinerary placeInfo={selectedPlace} show={showItinerary}/>
        <SignUp show={showSignUp} handleSignIn={handleSignIn}/>
        <SignIn show={showSignIn} handleSignUp={handleSignUp}/>
        {user && <MyLocations show={showLocations} userInfo={user}/>}
        <Instructions show={showInstructions} />
        <form action="#" onSubmit={handleSubmit} className='get-place-form'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" onChange={(e) => {setSearch(e.target.value)}} className='text-field' value={search} placeholder='Search for a location...' required/>
          <button type='submit' className='submit-button'>Search</button>
        </form>
      </main>

    </>
  )
}

export default App