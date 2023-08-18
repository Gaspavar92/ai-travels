import './styles/Instructions.css';

const Instructions = ({show}) => {
    if (!show) return null;
    return (
            <div className='instructions'>
              <h2 className="section-title instruction-title">Instructions</h2>
              <ol>
                <li>Use the Search Bar to look for a location you would like to visit</li>
                <li>Choose the number of days for your trip</li>
                <li>Create an Itinerary</li>
              </ol>
                <p>If you want to save your locations:</p>
              <ol>
                <li>Create your account</li>
                <li>Generate an itinerary and click on Save Itinerary</li>
                <li>You can access your itineraries from My Locations</li>
              </ol>
              <p className='enjoy'>Enjoy your trip!</p>
            </div>
    )
}

export default Instructions;