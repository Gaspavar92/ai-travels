import { useEffect, useState } from "react";
import { database, dbRef } from "./Firebase";
import { get, onValue } from "firebase/database";

import './styles/MyLocations.css'

const MyLocations = ({show}) => {

    const [locations, setLocations] = useState([]);
    const places = [];

    const handleClick = (e) => {
        if (!e.currentTarget.classList.contains('description')) {
            const locationDiv = e.currentTarget;
            locationDiv.classList.toggle('open');
        }
    };

    useEffect(() => {
        onValue(dbRef, () => {
            get(dbRef).then(res => {
                const data = res.val();
                for (let key in data) {
                    places.push({key: key, value: data[key]});
                }
            })
        })
        setLocations(places)
    }, [show]);

    console.log(locations)

    if (!show) return null;

    return (
        <div className="saved-locations">
            {locations.map(location => {
                return (
                    <div className="saved-location" id={location.key} key={location.key} onClick={handleClick}>
                        <h2>{location.value.location}</h2>
                        <div dangerouslySetInnerHTML={{__html: location.value.itinerary}} className="description hidden" onClick={handleClick}></div>
                    </div>
                )
            })}
        </div>
    )
};

export default MyLocations;