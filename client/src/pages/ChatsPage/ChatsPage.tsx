import {useEffect, useState} from 'react';

function ChatsPage() {
    const [temp, setTemp] = useState();

    async function health() {
        const response = await fetch(process.env.REACT_APP_API_URL + '/health');
        let result;
        try { 
            result = await response.json();
            setTemp(result.status);
        } catch(e) {
            console.log('TODO handle fetch serious failure, like JSON or CORS', e);
        }
        console.log('--health', result);
    }

    // componentDidMount mostly equivalent with the `[]` param
    // [] means the effect doesn’t use any value that participates in React data flow
    useEffect(() => {
        health();
    }, []);

    return (
        <section>
            <h2>ChatsPage TODO</h2>
            Connection to API: {process.env.REACT_APP_API_URL} is {temp}
        </section>
    )
}

export default ChatsPage;
