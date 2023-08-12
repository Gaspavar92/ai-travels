import { useEffect, useState } from "react";
import Loading from './Loading'
import "./styles/Place.css"

const Place = ({userPlace, show, createItinerary}) => {

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = (e, name, address, image, rating, types, numberOfDays) => {
        if (numberOfDays) {
            createItinerary(e, name, address, image, rating, types, numberOfDays);
        }
    }

    const apiKey = import.meta.env.VITE_MAPS_KEY;


    async function getPlace() {
        const url = new URL("https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/textsearch/json")
        const params = new URLSearchParams({
            query: userPlace,
            key: apiKey
        })
        
        url.search = params;
        
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            const places = data.results;
            
            
            // START Retrieving all places and pictures
            
            const placesWithPics = [];
            
            for (let place of places) {
                
                if (place.photos) {
                    const photoRef = place.photos[0].photo_reference;
                    const photoURL = new URL("https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/photo");
                    const photoParams = new URLSearchParams({
                        maxwidth: 400,
                        photo_reference: photoRef,
                        key: apiKey
                    })
                    
                    photoURL.search = photoParams;
                    
                    const photoResponse = await fetch(photoURL);
                    const photoLink = await photoResponse.blob();
                    
                    const picURL = URL.createObjectURL(photoLink);
                    placesWithPics.push({...place, url: picURL})
                } else {
                    const picURL = "/no-image.png"
                    placesWithPics.push({...place, url: picURL})
                }
            }
            
            setPlaces(placesWithPics);
        } catch {
            console.log('ERROR!')
        } finally {
            setLoading(false);
        }
        
        
        // END Setting up all places and pics
    }

    useEffect(() => {
        if(!show) return;
        getPlace();
    }, [userPlace, show])

        if (!show) return null;

        return (
            loading ?
            <Loading /> :
            <ul className="all-places">
                {places.map((place) => {
                    return (
                            <li key={place.place_id} className="list-place">
                                <h2>{place.name}</h2>
                                {place.formatted_address && <h3>{place.formatted_address}</h3>}
                                <img src={place.url} className="location"></img>
                                <form className="days">
                                    <label htmlFor="number">Number of days:</label>
                                    <input type="number" className="number-of-days" id="number" min={0} required/>
                                    <button className="select-button gpt-btn" onClick={(e) => {handleClick(e, place.name, place.formatted_address, place.url, place.rating, place.types, e.target.parentNode.children[1].value)}}><i className="fa-solid fa-earth-americas"></i>Create Itinerary</button>
                                </form>
                            </li>
                    )
                })}
            </ul>
        )

    }


export default Place;