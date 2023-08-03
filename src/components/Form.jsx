import { useState } from "react";
import Assessment from "./Assessment";
import { Configuration, OpenAIApi } from 'openai';
import "./styles/Form.css"

const Form = () => {

    const [response, setResponse] = useState('');

    const getResponse = async function(event) {

        event.preventDefault();

        setResponse('');
        const apiKey = import.meta.env.VITE_API_KEY;

        const configuration = new Configuration({
            apiKey: apiKey
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": `You are a virtual travel agent; Provided a place to visit, you provide an itinerary with suggestions about restaurants, activities, places to see and things to do.`}, {role: "user", content: `Montreal`}],
        });

        setResponse(completion.data.choices[0].message.content);
    }

    return (

        <div className="assessment">
        <form>
            <button onClick={getResponse} type="submit">Assess</button>
        </form>

        <Assessment response={response}/>
        </div>
    )
};

export default Form;