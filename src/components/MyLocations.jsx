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
        const parentDiv = e.currentTarget.parentElement;
        locationDiv.classList.add('open');
        parentDiv.classList.add('open-overflow');
    };

    const closeLocation = (e) => {
        e.stopPropagation();
        const grandParentDiv = e.currentTarget.parentElement.parentElement;
        const parentDiv = e.currentTarget.parentElement;
        parentDiv.classList.remove('open');
        grandParentDiv.classList.remove('open-overflow');
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
        <>
            <h2 className="section-title">My Locations</h2>
            <div className="saved-locations">
                {locations.map(location => {
                    return (
                        <div className="location-info" key={location.key}>
                            <div className="saved-location" id={location.key} onClick={handleClick}>
                                <h2>{location.value.location}</h2>
                                <h3>Duration: {location.value.days} {location.value.days == 1 ? "day" : "days"}</h3>
                                <button className="hidden close-btn" onClick={closeLocation}><i className="fa-solid fa-xmark"></i></button>
                                <div dangerouslySetInnerHTML={{__html: location.value.itinerary}} className="description hidden"></div>
                            </div>
                            <button className="remove-btn" onClick={removeLocation}><i className="fa-solid fa-trash-can"></i>Remove</button>
                            <div className="overflow"></div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default MyLocations;