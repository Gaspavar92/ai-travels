import "./styles/Sidebar.css";

const Sidebar = ({handlePlace, handleLocations, handleSignIn}) => {

  // Function to open sidebar menu

  const openMenu = (e) => {
    e.currentTarget.parentElement.classList.toggle('open-sidebar');
  }

    return (
        <div className="sidebar">
          <div className="hamburger-icon" onClick={openMenu}>
            <span></span>
          </div>
        <h1><span className="ai">AI</span> <span className="letter-t">T</span>ravels</h1>
        <div className="gpt-buttons">
          <button className='search-place gpt-btn' onClick={handlePlace}><i className="fa-regular fa-map"></i>Instructions</button>
          <button className='gpt-btn' onClick={handleLocations}><i className="fa-solid fa-heart"></i>My Locations</button>
          <button className='gpt-btn' onClick={handleSignIn}><i className="fa-solid fa-user"></i>Sign In</button>
        </div>
        <div className="logo">
          <img className='world' src="/logo.png" alt="3d world map" />
        </div>
      </div>
    )
}

export default Sidebar;