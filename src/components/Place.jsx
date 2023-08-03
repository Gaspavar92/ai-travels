import { useEffect, useState } from "react";

const Place = ({user_place}) => {

    const [places, setPlaces] = useState([]);

    const apiKey = import.meta.env.VITE_MAPS_KEY;


useEffect(() => {
    async function getPlace() {
        const url = new URL("https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/textsearch/json")
        const params = new URLSearchParams({
            query: user_place,
            key: apiKey
        })

        url.search = params;
    
        const response = await fetch(url);
        const data = await response.json();
        const places = data.results;


        // START Retrieving all places and pictures

            const placesWithPics = [];

            for (let place of places) {
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
            }

            setPlaces(placesWithPics);

        // END Setting up all places and pics
    }

    getPlace()

        }, [user_place])

        return (
            <ul className="all-places">
                {places.map((place) => {
                    return (
                            <li key={place.place_id}>
                                <h2>{place.name}</h2>
                                <img src={place.url}></img>
                            </li>
                    )
                })}
            </ul>
        )

    }


export default Place;