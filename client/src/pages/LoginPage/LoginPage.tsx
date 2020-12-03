import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {authenticate, isAuthenticated} from '../../store/authService';


async function doLogin(username, password) {
    // const history = createBrowserHistory();

    // TEMP COMMENTS
    // let formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);
    // Note: Do not set the content-type header.
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //let formData = new FormData(formRef.current.value);
    // body: formData,

    const response = await fetch(process.env.REACT_APP_API_URL + '/accounts/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    });

    let result;
    let errorMessage = 'An error occurred.';
    try { 
        result = await response.json();

        // Success
        if (result && result.idToken) {
            authenticate({
                idToken: result.idToken,
                expiresIn: result.expiresIn
            });

            return {success: true};
        }

        // Fail
        if (result.status === 'error') {
            errorMessage = result.message;
        }
    } catch(e) {
        // Fail
        errorMessage = e.message;
    }

    // Fail
    return {success: false, message: errorMessage};
}


function LoginPage(/*props*/) {
    // Hooks below, must be used in react component
    let history = useHistory();
    let location = useLocation();   // TODO:

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

        const authResult = await doLogin(username.value, password.value);

        if (authResult.success) {
            console.log('forwarding to /chats...')

            // Forwarding Fails:
            // props.history.push({pathname: '/chats'})
            // return (<Redirect to='chats' />)
            // history.push('/chats');
            // history.push('chats');

            // TODO: then remove above when other stuff works
            // let { from } = location.state || { from: { pathname: "/" } };

            // TEMP: This works but is not generic
            let {from} = {from: {pathname: '/chats'}};

            history.replace(from);
        } else {
            alert('Temp: ' + authResult.message);
        }
    }

    // componentDidMount mostly equivalent with the `[]` param
    // [] means the effect doesn’t use any value that participates in React data flow
    useEffect(() => {

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

        </section>
    )
}


 export default LoginPage;
