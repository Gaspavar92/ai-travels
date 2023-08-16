import './styles/Instructions.css';

const Instructions = ({show}) => {
    if (!show) return null;
    return (
            <div className='instructions'>
              <h2 className="section-title">Instructions</h2>
              <ol>
                <li>Use the Search Bar to look for a location you would like to visit</li>
                <li>Choose the number of days for your trip and create an itinerary</li>
                <li>You can save your itinerary and access it from the My Locations tab</li>
                <li>In order to start again, simply look for another place</li>
                <li>Enjoy your trip!</li>
              </ol>
            </div>
    )
}

export default Instructions;