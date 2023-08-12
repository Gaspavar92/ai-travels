import { useEffect, useState } from "react";
import { database, dbRef } from "./Firebase";
import { get, onValue, ref, remove } from "firebase/database";

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

    const removeLocation = (e) => {
        const childRef = ref(database, `/${e.target.parentElement.firstChild.id}`);
        remove(childRef);
        onValue(dbRef, () => {
            get(dbRef).then(res => {
                const data = res.val();
                for (let key in data) {
                    places.push({key: key, value: data[key]});
                }
            })
        })
        setLocations(places)
    }

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

    if (!show) return null;

    return (
        locations.length === 0 ?
        <p className="no-itinerary">You didn't save an itinerary yet.</p> :
        <div className="saved-locations">
            {locations.map(location => {
                return (
                    <div className="location-info">
                        <div className="saved-location" id={location.key} key={location.key} onClick={handleClick}>
                            <h2>{location.value.location}</h2>
                            <h3>Duration: {location.value.days} days</h3>
                            <div dangerouslySetInnerHTML={{__html: location.value.itinerary}} className="description hidden" onClick={handleClick}></div>
                        </div>
                        <button className="remove-btn" onClick={removeLocation}><i class="fa-solid fa-trash-can"></i>Remove</button>

                    </div>
                )
            })}
        </div>
    )
};

export default MyLocations;