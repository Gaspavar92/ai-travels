import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from 'openai';
import "./styles/Itinerary.css"

const Form = ({place_info}) => {

    console.log(place_info)

    const [response, setResponse] = useState('');

    useEffect(() => {
        const getResponse = async function() {
    
            setResponse('');
            const apiKey = import.meta.env.VITE_API_KEY;
    
            const configuration = new Configuration({
                apiKey: apiKey
            });
            const openai = new OpenAIApi(configuration);
            const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": `You are a virtual travel agent; Provided a place to visit, you provide an itinerary with suggestions about restaurants, activities, places to see and things to do.`}, {role: "user", content: `Place name: ${place_info.name}, place address: ${place_info.address}, place ratings: ${place_info.ratings}, place types${place_info.types.map(type => type)}`}],
            });
    
            setResponse(completion.data.choices[0].message.content);
        }
    
        getResponse();
    }, [place_info])


    return (

        <div className="itinerary">
            <p>{response}</p>
        </div>
    )
};

export default Form;