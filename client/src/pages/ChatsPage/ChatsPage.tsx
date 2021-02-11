import {useEffect, useState} from 'react';
import {useRouteMatch, Route, Switch, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {account} from '../../services/accountService';
import {requestGetHealth} from '../../services/healthService';
import {requestGetChats} from '../../services/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';

import {getChatsAction} from '../../store/chatsActions';


function ChatsPage() {
    const [health, setHealth] = useState({status: 'UNKNOWN'});
    let [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 

    let [chats, setChats] = useState<any[]>([]);
    const chatsData = useSelector(state => state.chats);

    let {path} = useRouteMatch();


    const dispatch = useDispatch();
    

    // >>>>>>>>TESTS
    const testData = useSelector(state => state.test);
    // test it once
    useEffect(() => { 
      setTimeout(()=>{dispatch({type: 'TEST', payload: {data: 'ChatsPage dispatch'} })}, 2000);
    }, []);
    // >>>>>>>>END TESTS





    // const chatsData = useSelector(state => state.chats);
    // useEffect(() => { 
    //     dispatch(getChatsAction())
    //     console.log('chatData=', chatData)
    // }, []);





    useEffect(() => {
        const accountData = account.getAccount();
        setUserData(accountData);

        (async () => {
            const healthData = await requestGetHealth()
            setHealth(healthData);

            // try {
            //     const chatsData = await requestGetChats();
            //     setChats(chatsData);
            // } catch(e) {
            //     console.log(e);
            // }

            dispatch(getChatsAction())
            console.log('chatsData=', chatsData)
        })();
    }, []);

    return (
        <section>
<h2>test: {testData.data}</h2>

            <h2>ChatsPage TODO (<Link to={`/home`}>home</Link>)</h2>
            <div>Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {userData.username}</div>
            
            {/* <ChatsList chats={chats} /> */}
            <ChatsList chats={chatsData} />
            
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
