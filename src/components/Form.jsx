import { useState } from "react";
import Assessment from "./Assessment";
import { Configuration, OpenAIApi } from 'openai';

const Form = () => {

    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [desiredJob, setDesiredJob] = useState('');
    const [level, setLevel] = useState('');
    const [timeframe, setTimeframe] = useState('');
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
        messages: [{"role": "system", "content": `You are a career success coach. Users will provide you with information about their career goals and you will give them recommendations, tools, and resources to succeed. Ask additional questions to make a tailored career plan. Provide answer in this order: general assessment (include summary, roadmap, general suggestions), topics to start, resources. Always strictly answer in this format:
        
        <h2>Here are your results:</h2>

        <h3>General assessment:</h3>
        <p>Answer</p> or <ul></ul> for lists
        <br>

        <h3>Roadmap:</h3>
        <p>Answer</p> or <ul></ul> for lists
        <br>

        <h3>Suggestions</h3>
        <p>Answer</p> or <ul></ul> for lists
        <br>

        <h3>Topics to start:</h3>
        <p>Answer</p> or <ul></ul> for lists
        <br>

        <h3>Resources:</h3>
        <p>Answer</p> or <ul></ul> for lists, <p><a></a></p> for links
        <br>
        `}, {role: "user", content: `Name: ${name}, Occupation: ${occupation}, Desired job: ${desiredJob}, Level: ${level}, Timeframe: ${timeframe}`}],
        });

        setResponse(completion.data.choices[0].message.content);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
    }
    const handleJobChange = (event) => {
        setDesiredJob(event.target.value);
    }
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    }
    const handleTimeframeChange = (event) => {
        setTimeframe(event.target.value);
    }

    return (

        <>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={handleNameChange}/>

            <label htmlFor="occupation">Occupation:</label>
            <input type="text" id="occupation" name="occupation" onChange={handleOccupationChange}/>

            <label htmlFor="desired-job">Desired Job:</label>
            <input type="text" id="desired-job" name="desired-job" onChange={handleJobChange}/>

            <label htmlFor="level">Level:</label>
            <input type="text" id="level" name="level" onChange={handleLevelChange}/>

            <label htmlFor="timeframe">Timeframe:</label>
            <input type="text" id="timeframe" name="timeframe" onChange={handleTimeframeChange}/>

            <button onClick={getResponse}>GET RESPONSE</button>
        </form>

        {response ? <Assessment response={response}/> : "Loading..." }
        </>
    )
};

export default Form;