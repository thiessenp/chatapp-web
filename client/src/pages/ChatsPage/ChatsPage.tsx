import {useEffect, useState} from 'react';
import {useRouteMatch, Route,  Switch} from 'react-router-dom';
import {account} from '../../store/accountService';
import {requestGetHealth} from '../../store/healthService';
import {requestGetChats} from '../../store/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';

// NOTE: interesting that const works with hooks - must re-call function on any update

function ChatsPage() {
    const [health, setHealth] = useState({status: 'UNKNOWN'});
    let [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 
    let [chats, setChats] = useState<any[]>([]);
    let {path} = useRouteMatch();

    useEffect(() => {
        const accountData = account.getAccount();
        setUserData(accountData);

        (async () => {
            const healthData = await requestGetHealth()
            setHealth(healthData);

            const chatsData = await requestGetChats();
            setChats(chatsData);
        })();
    }, []);

    return (
        <section>
            <h2>ChatsPage TODO</h2>
            <div>Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {userData.username}</div>
            
            <ChatsList chats={chats} />

            <Switch>
                <Route path={`${path}/:chatId`}>
                    <Chat account={userData} />
                </Route>
            </Switch>
        </section>
    )
}

export default ChatsPage;
