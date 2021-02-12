import {useEffect, useState} from 'react';
import {useRouteMatch, Route, Switch, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {account} from '../../services/accountService';
import {requestGetHealth} from '../../services/healthService';
import {requestGetChats} from '../../services/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';

import {getChatListAction} from '../../store/chatsActions';


function ChatsPage() {
    const dispatch = useDispatch();
    const chatListData = useSelector(state => state.chats);
    const [health, setHealth] = useState({status: 'UNKNOWN'});
    let [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 
    let {path} = useRouteMatch();


    // >>>>>>>>TESTS
    const testData = useSelector(state => state.test);
    // test it once
    useEffect(() => { 
      setTimeout(()=>{dispatch({type: 'TEST', payload: {data: 'ChatsPage dispatch'} })}, 2000);
    }, []);
    // >>>>>>>>END TESTS


    useEffect(() => {
        const accountData = account.getAccount();
        setUserData(accountData);

        (async () => {
            const healthData = await requestGetHealth()
            setHealth(healthData);

            dispatch(getChatListAction());
        })();
    }, []);

    return (
        <section>
<h2>test: {testData.data}</h2>

            <h2>ChatsPage TODO (<Link to={`/home`}>home</Link>)</h2>
            <div>Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {userData.username}</div>
            
            {/* <ChatsList chats={chats} /> */}
            <ChatsList chats={chatListData} />
            
            <Switch>
                <Route path={`${path}/:chatId`}>
                    {userData.id && <Chat account={userData} />}
                    
                    {/* <Chat /> */}
                </Route>
            </Switch>
        </section>
    )
}

export default ChatsPage;
