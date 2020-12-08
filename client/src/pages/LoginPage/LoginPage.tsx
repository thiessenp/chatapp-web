import React, {useEffect} from 'react';
import {useHistory /*,useLocation*/} from 'react-router-dom';
//import {authenticate, requestPostlogin, requestGetAccount, updateAccount} from '../../store/accountService';
import {account} from '../../store/accountService';


function LoginPage(/*props*/) {
    // Hooks below, must be used in react component
    let history = useHistory();
    //let location = useLocation();   // TODO:

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
