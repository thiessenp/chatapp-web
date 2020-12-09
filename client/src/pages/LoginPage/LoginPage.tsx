import React, {useEffect, useState} from 'react';
import {useHistory /*,useLocation*/} from 'react-router-dom';
//import {authenticate, requestPostlogin, requestGetAccount, updateAccount} from '../../store/accountService';
import {account} from '../../store/accountService';
import {requestGetHealth} from '../../store/healthService';

// NOTE: Hooks must be used in react components

function LoginPage(/*props*/) {
    const [health, setHealth] = useState({status: 'UNKNOWN'});
    let history = useHistory();

    // TODO:
    //let location = useLocation();

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const username = usernameRef.current;
        const password = passwordRef.current;

        if (!username || !password) {
            alert('TODO: username and password required');
            return;
        }

        const authResult = await account.login({
            username: username.value.trim(), 
            password: password.value.trim()
        });

        if (authResult.success) {
            console.log('forwarding to /chats...')

            // TODO: 
            // -- then remove above when other stuff works
            // let { from } = location.state || { from: { pathname: "/" } };

            // TEMP:
            // -- This works but is not generic
            let {from} = {from: {pathname: '/chats'}};

            history.replace(from);
        } else {
            alert('Temp: ' + authResult.message);
        }
    }

    useEffect(() => {
        (async () => {
            setHealth(await requestGetHealth());
        })();

    }, []);

    return (
        <section>
            <h2>Login TODO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username <input ref={usernameRef} /></label>
                </div>
                <div>
                    <label>Password <input ref={passwordRef} /></label>
                </div>
                <button type="submit">LogIn to Chat</button>
            </form>

            <p>Connection to API: {process.env.REACT_APP_API_URL} is {health.status}</p>
        </section>
    )
}

 export default LoginPage;
