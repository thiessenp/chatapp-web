import {useEffect, useState} from 'react';
import {useRouteMatch, Route, Switch, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getChatsAction} from '../../store/chatsActions';
// import {requestGetHealth} from '../../services/healthService';
import {getHealthAction} from '../../store/healthActions';
import {Poll} from '../../services/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';


function ChatsPage() {
    const dispatch = useDispatch();
    let {path} = useRouteMatch();
    const health = useSelector(state => state.health);
    const chats = useSelector(state => state.chats);
    const account = useSelector(state => state.account);

/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
HERE:
Add health API to Redux
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
    // const [health, setHealth] = useState({status: 'UNKNOWN'});
 

    // Server health up/down status
    useEffect(() => {
        dispatch(getHealthAction());
    }, []);

    // Bootstrap with Account Data, then get initial Chats data
    useEffect(() => {
        // const accountData = account.getAccount();
        // setUserData(accountData);

        // (async () => {
        //     const healthData = await requestGetHealth()
        //     setHealth(healthData);
        // })();

        let poll;
        (async () => {
            // Get initial all Chat data
            dispatch(getChatsAction({isAllData:true}));

            // Poll Chat List - just list updates (let each Chat handle their full updates)
            const callback:any = () => { return dispatch(getChatsAction({isAllData:false})); }
            // Delay 4s, rare event of new Chat
            poll = new Poll({callback, delay: 4000});
        })();

        return () => { poll.stop(); }
    }, []);

    return (
        <section>
            <h2>ChatsPage TODO (<Link to={`/home`}>home</Link>)</h2>
            <div>Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {account.username}</div>

            <ChatsList chats={chats} />
            
            <Switch>
                <Route path={`${path}/:chatId`}>
                    {account.id && 
                        <Chat account={account} chats={chats} />
                    }
                </Route>
            </Switch>
        </section>
    )
}

export default ChatsPage;
