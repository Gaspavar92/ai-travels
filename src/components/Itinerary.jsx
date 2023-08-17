import { useEffect, useState, useRef } from "react";
import { Configuration, OpenAIApi } from 'openai';
import { push, remove, ref } from "firebase/database";
import "./styles/Itinerary.css"

import { database } from './Firebase';
import Loading from "./Loading";

const Itinerary = ({placeInfo, show, userInfo}) => {

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function getResponse() {
        
        try {
            setLoading(true);
            setResponse('');
            const apiKey = import.meta.env.VITE_API_KEY;
            
            const configuration = new Configuration({
                apiKey: apiKey
            });
            const openai = new OpenAIApi(configuration);
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": `You are a virtual travel agent; Provided a place to visit, you provide an itinerary with suggestions about restaurants, activities, places to see and things to do. You will also provide a summary with the place type. ALWAYS use HTML markup and use proper spacing between days. Don't use h1 and DO NOT provide additional styling.`}, {role: "user", content: `Place name: ${placeInfo.name}, place address: ${placeInfo.address}, place ratings: ${placeInfo.ratings}, place types: ${placeInfo.types.map(type => type)}, number of days: ${placeInfo.numberOfDays}`}],
            });

            const response = {location: placeInfo.name, itinerary: completion.data.choices[0].message.content, days: placeInfo.numberOfDays}
            
            setResponse(response);
        } catch {
            console.log('ERROR!')
        } finally {
            setLoading(false)
        }
    }  

    // Function to handle destination's saving and removal

    let responseKey;
    
    const saveTrip = (e) => {
        if (userInfo) {
            if (e.target.textContent == "Save Itinerary") {
                e.target.textContent = "Saved";
                e.target.classList.add('saved');
                const userPath = `users/${userInfo.uid}/savedTrips`;
                const dbRef = ref(database, userPath);
                const trip = push(dbRef, response);
                console.log(trip.key)
                responseKey = trip.key;
            } else if (e.target.textContent = "Saved") {
                e.target.textContent = "Save Itinerary";
                e.target.classList.remove('saved');
                if (responseKey) {
                    const userPath = `users/${userInfo.uid}/savedTrips`;
                    const childRef = ref(database, `${userPath}/${responseKey}`);
                    remove(childRef);
                    responseKey = "";
                }
            }
        } else {
            setError('You need to be logged in.')
        }
    };

    // Showing response conditionally if this component is shown to the main page

    useEffect(() => {
        if (!show) return;
        setError('');
        getResponse();
    }, [show])

    if (!show) return null;

    return (
        loading ?
        <Loading /> :
        <div className="itinerary">
        <h2 className="section-title">Itinerary</h2>
        <p dangerouslySetInnerHTML={{ __html: response.itinerary }}></p>
            <button className="save-itinerary" onClick={(e) => saveTrip(e)}>Save Itinerary</button>
            {error && <p>{error}</p>}
        </div>
    )
};

export default Itinerary;