import React, {useEffect} from 'react';
import {useHistory /*,useLocation*/} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {isAuth} from '../../services/accountService';
// import {requestGetHealth} from '../../services/healthService';
import {getHealthAction} from '../../store/healthActions';
import {getLoginAction} from '../../store/accountActions';


// NOTE: Hooks must be used in react components
function LoginPage(/*props*/) {
    const dispatch = useDispatch();
    const health = useSelector(state => state.health);
    const accountData = useSelector(state => state.account);

    let history = useHistory();
    // TODO:
    //let location = useLocation();

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);


    // Server health up/down status
    useEffect(() => {
        dispatch(getHealthAction());
    }, []);

    useEffect(() => {
        if (!isAuth(accountData)) { return; }

        // TODO: 
        // -- then remove above when other stuff works
        // let { from } = location.state || { from: { pathname: "/" } };

        // TEMP:
        // -- This works but is not generic
        console.log('forwarding to /chats...');
        let {from} = {from: {pathname: '/chats'}};
        history.replace(from);
    }, [accountData]);
    
    async function handleSubmit(e) {
        e.preventDefault();

        const username = usernameRef.current;
        const password = passwordRef.current;

        if (!username || !password) {
            alert('TODO: username and password required');
            return;
        }

        // Do the Login - on success the below should forward the user to the Chats
        dispatch(getLoginAction({
            username: username.value, 
            password: password.value
        }));
    }

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
