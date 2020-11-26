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

    // TODO this is wrong read up on it again, for use on after page load
    useEffect(() => {
        health();
    })

    return (
        <section>
            <h2>ChatsPage TODO</h2>
            Connection to API: {process.env.REACT_APP_API_URL} is {temp}
        </section>
    )
}

export default ChatsPage;
