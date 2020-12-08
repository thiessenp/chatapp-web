import {useEffect, useState} from 'react';
import {account} from '../../store/accountService';

function ChatsPage() {
    const [temp, setTemp] = useState();
    // Note: interesting that const works - must re-call function on any update
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 

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

    // async function getAccount() {
    //     const response = await requestGetAccount();
    //     console.log('getAccount', response);
    // }

    // componentDidMount mostly equivalent with the `[]` param
    // [] means the effect doesn’t use any value that participates in React data flow
    useEffect(() => {
        health();
        
        // const data = account();
        const data = account.getAccount();
        setUserData(data);

    }, []);

    return (
        <section>
            <h2>ChatsPage TODO</h2>
            Connection to API: {process.env.REACT_APP_API_URL} is {temp} with account {userData.username}
        </section>
    )
}

export default ChatsPage;
