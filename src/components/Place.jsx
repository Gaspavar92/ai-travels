import { useEffect, useState } from "react";
import Loading from './Loading'
import "./styles/Place.css"

const Place = ({user_place, selectFunction}) => {

    console.log('component mounted')

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClick = (e, name, address, image, rating, types, numberOfDays) => {
        selectFunction(e, name, address, image, rating, types, numberOfDays);
    }

    const apiKey = import.meta.env.VITE_MAPS_KEY;


    async function getPlace() {
        const url = new URL("https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/textsearch/json")
        const params = new URLSearchParams({
            query: user_place,
            key: apiKey
        })
        
        url.search = params;
        
        try {
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
                    const picURL = "../src/assets/no-image.png"
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
        getPlace()
    }, [user_place])

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
                                <div className="days">
                                    <p>Number of days:</p>
                                    <input type="number" className="number-of-days"></input>
                                </div>
                                <button className="select-button" onClick={(e) => {handleClick(e, place.name, place.formatted_address, place.url, place.rating, place.types, e.target.parentNode.children[3].lastChild.value)}}>Select</button>
                            </li>
                    )
                })}
            </ul>
        )

    }


export default Place;