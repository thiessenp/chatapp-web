import {useEffect,} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// NOTE: Important to do Component specific imports.
// This would import entire lib: import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

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
              <h1 className="h1">ChatApp (WIP)</h1>

              <p><small>Connection to API: {process.env.REACT_APP_API_URL} is {health.status}</small></p>
              <Link to={`/chats`}>Go to the Chats id</Link>

              <Button variant="primary">Test</Button>
              <Button variant="Link"><Link to={`/chats`}>Go to the Chats id</Link></Button>

        </section>
    )
}
