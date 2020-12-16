import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {requestGetChat} from '../store/chatsService';
import {Transcript} from './Transcript';
import {Roster} from './Roster';
import {Composer} from './Composer';
import {requestPostMessage, requestAddUserTochat} from '../store/chatsService';


// NOTE: props receives an account
export function Chat(props) {
    let [chat, setChat] = useState<any>({});
    let [chatUser, setChatUser] = useState<any>({});
    let [transcript, setTranscript] = useState<any[]>([]);
    let [roster, setRoster] = useState<any[]>([]);
    let {chatId} = useParams();

    let polling = {
        isStopped: false,
        delay: 2000
    };

    // CAREFUL: infinite loops below if change - TODO readmore about hook lifecycle
    useEffect(() => {
        (async () => {
            // if (!chatUser.id) {
                addUser();
            // }

            updateChat();
        })();
    // });
    }, [chatId]);

    async function addUser() {
        try {
            const chatUserData = await requestAddUserTochat({
                chatId, 
                accountId: props.account.id
            });
            setChatUser({id: chatUserData.id});
        } catch(e) {
             // TODO: error handling service?
            console.log('--ERROR', e.message);
        }
    }

    async function updateChat() {
        try {
            const chatData = await requestGetChat({chatId});
            setChat(chatData);
            setTranscript(chatData.transcript);
            setRoster(chatData.roster);
        } catch(e) {
             // TODO: error handling service?
            console.log('--ERROR', e.message);
        }
    }

    async function sendMessage({content}) {
        const message = {
            chatId: chat.id,
            fromChatUserId: chatUser.id,
            toChatUserId: chatUser.id,
            content
        };

        console.log('sendMessage, message=', message);
        const response = await requestPostMessage(message);
        console.log('requestPostMessage response=', response);
    }

    // TODO: TEMP:
    // TODO: maybe some kind of backoff logic?
    // NOTE: Tried to move to a seperate file in a Service but difficult to tie into redux
    function startPolling() {
        if (polling.isStopped) return;

        setTimeout(() => {
            updateChat();
            startPolling();
        }, polling.delay);
    }

    // TODO: Not working...updates here but not in startPolling, closured...
    // function stopPolling() {
    //     polling.isStopped = true;
    // }

    return (
        <section>
            <h3>Chat: {chat && chat.name} 
                <button onClick={updateChat}>update</button> 
                <button onClick={startPolling}>start polling</button>
            </h3>

            <Roster roster={roster} />

            <Transcript transcript={transcript} />

            <Composer sendMessage={sendMessage} />
        </section>
    )
}
