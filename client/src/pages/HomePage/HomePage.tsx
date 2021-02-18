import {useEffect,} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getHealthAction} from '../../store/healthActions';


export default function HomePage() {
    const dispatch = useDispatch();
    const health = useSelector(state => state.health);

    // Server health up/down status
    useEffect(() => {
        dispatch(getHealthAction());
    }, []);

    return (
        <section>
            <header className="App-header">
              <h1>ChatApp (WIP)</h1>
              <p><small>Connection to API: {process.env.REACT_APP_API_URL} is {health.status}</small></p>
              <Link to={`/chats`}>Go to the Chats id</Link>
            </header>
        </section>
    )
}
