import {useEffect, useState} from 'react';
import {useRouteMatch, Route, Switch, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {account} from '../../services/accountService';
import {requestGetHealth} from '../../services/healthService';
import {Poll} from '../../services/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';

import {getChatsAction} from '../../store/chatsActions';


function ChatsPage() {
    const dispatch = useDispatch();
    let {path} = useRouteMatch();

    const chats = useSelector(state => state.chats);

    const [health, setHealth] = useState({status: 'UNKNOWN'});
 
    let [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 


    // Bootstrap with Account Data, then get initial Chats data
    useEffect(() => {
        const accountData = account.getAccount();
        setUserData(accountData);

        (async () => {
            const healthData = await requestGetHealth()
            setHealth(healthData);
        })();

        let poll;
        (async () => {
            // Get initial all Chat data
            dispatch(getChatsAction({isAllData:true}));

            // Poll just for Chat list updates (let each Chat handle their full updates)
            const callback:any = () => { return dispatch(getChatsAction({isAllData:false})); }
            poll = new Poll({callback});
        })();

        return () => { console.log('stop'); poll.stop(); }
    }, []);

    return (
        <section>
            <h2>ChatsPage TODO (<Link to={`/home`}>home</Link>)</h2>
            <div>Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {userData.username}</div>

            <ChatsList chats={chats} />
            
            <Switch>
                <Route path={`${path}/:chatId`}>
                    {userData.id && 
                        <Chat account={userData} chats={chats} />
                    }
                </Route>
            </Switch>
        </section>
    )
}

export default ChatsPage;
