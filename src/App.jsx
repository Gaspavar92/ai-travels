import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import Place from './components/Place';

import './App.css'

function App() {

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(search);
  }

  return (
    <>
      <Sidebar />

      <main>
        <Place user_place={place}/>

        <form action="#" onSubmit={handleSubmit} className='get-place-form'>
          <input type="text" onChange={handleChange}/>
          <button type='submit'>Search</button>
        </form>

      </main>

    </>
  )
}

export default App
