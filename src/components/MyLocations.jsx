import { useEffect, useState } from "react";
import { database, dbRef } from "./Firebase";
import { get, onValue, ref, remove } from "firebase/database";

import './styles/MyLocations.css'

const MyLocations = ({show}) => {

    const [locations, setLocations] = useState([]);
    const places = [];

    const handleClick = (e) => {
        e.stopPropagation();
        const locationDiv = e.currentTarget;
        locationDiv.classList.add('open');
    };

    const closeLocation = (e) => {
        e.stopPropagation();
        const parentDiv = e.currentTarget.parentElement;
        parentDiv.classList.remove('open');
    }

    const removeLocation = (e) => {
        const childRef = ref(database, `/${e.target.parentElement.firstChild.id}`);
        remove(childRef);
        onValue(dbRef, () => {
            const updatedPlaces = [];
            get(dbRef).then(res => {
                const data = res.val();
                for (let key in data) {
                    updatedPlaces.push({key: key, value: data[key]});
                }
                setLocations(updatedPlaces)
            })
        })
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
                    <div className="location-info" key={location.key}>
                        <div className="saved-location" id={location.key} onClick={handleClick}>
                            <h2>{location.value.location}</h2>
                            <h3>Duration: {location.value.days} days</h3>
                            <button className="hidden close-btn" onClick={closeLocation}><i className="fa-solid fa-xmark"></i></button>
                            <div dangerouslySetInnerHTML={{__html: location.value.itinerary}} className="description hidden"></div>
                        </div>
                        <button className="remove-btn" onClick={removeLocation}><i className="fa-solid fa-trash-can"></i>Remove</button>
                    </div>
                )
            })}
        </div>
    )
};

export default MyLocations;