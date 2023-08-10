import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from 'openai';
import "./styles/Itinerary.css"

import Loading from "./Loading";
import Firebase from "../Firebase";

const Itinerary = ({place_info, show}) => {

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveItinerary, setSaveItinerary] = useState(false);

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
                messages: [{"role": "system", "content": `You are a virtual travel agent; Provided a place to visit, you provide an itinerary with suggestions about restaurants, activities, places to see and things to do. You will also provide a summary with the place type. ALWAYS use HTML markup and use proper spacing between days. Don't use h1 and DO NOT provide additional styling.`}, {role: "user", content: `Place name: ${place_info.name}, place address: ${place_info.address}, place ratings: ${place_info.ratings}, place types: ${place_info.types.map(type => type)}, number of days: ${place_info.numberOfDays}`}],
            });
            
            setResponse(completion.data.choices[0].message.content);
        } catch {
            console.log('ERROR!')
        } finally {
            setLoading(false)
        }
    }  
    
    const saveTrip = () => {
        setSaveItinerary(prev => !prev);
        console.log(saveItinerary)
    };

    // Showing response conditionally if this component is shown to the main page

    useEffect(() => {
        if (!show) return;
        getResponse();
    }, [show])

    if (!show) return null;

    return (
        loading ?
        <Loading /> :
        <div className="itinerary">
        <p dangerouslySetInnerHTML={{ __html: response }}></p>
            <button className="save-itinerary" onClick={saveTrip}>Save Itinerary</button>
            <Firebase itinerary={response} saveState={saveItinerary} />
        </div>
    )
};

export default Itinerary;