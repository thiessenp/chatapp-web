import {useEffect, useState} from 'react';
import {account} from '../../store/accountService';
import {requestGetHealth} from '../../store/healthService';
import {requestGetChats, requestGetChat} from '../../store/chatsService';
import {ChatsList} from '../../components/ChatsList';
import {Chat} from '../../components/Chat';

// TEMP
import {Transcript} from '../../components/Transcript';
import {Roster} from '../../components/Roster';

// NOTE: interesting that const works with hooks - must re-call function on any update

function ChatsPage() {
    const [health, setHealth] = useState({status: 'UNKNOWN'});
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        idToken: '',
        expiresIn: ''
    }); 
    let [chats, setChats] = useState<any[]>([]);

    //TEMP
    let [chat, setChat] = useState<any[]>([]);
    let [transcript, setTranscript] = useState<any[]>([]);
    let [roster, setRoster] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            setHealth(await requestGetHealth());
        })();

        const accountData = account.getAccount();
        setUserData(accountData);

        (async () => {
            const chatsData = await requestGetChats();
            setChats(chatsData);

            // TEMP
            const chatData = await requestGetChat({chatId: chatsData[0].id});
            setChat(chatData);
            setTranscript(chatData.transcript);
            setRoster(chatData.roster);
        })();

        (async () => {

        })();

    }, []);

    return (
        <section>
            <h2>ChatsPage TODO</h2>
            Connection to API: {process.env.REACT_APP_API_URL} is {health.status} with account {userData.username}
            
            <ChatsList chats={chats} />

            {/* TODO: WITH SLOTS */}
            <Chat chat={chat} />
            <h3>Roster</h3>
            <Roster roster={roster} />
            <h3>Transcript</h3>
            <Transcript transcript={transcript} />
            {/* END TODO: WITH SLOTS */}

        </section>
    )
}

export default ChatsPage;
