import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {requestGetChat} from '../store/chatsService';
import {Transcript} from './Transcript';
import {Roster} from './Roster';
import {Composer} from './Composer';
import {requestPostMessage, addUserTochat} from '../store/chatsService';


/**
TODO:
(Go beyond prototype stage here :) though maybe wait for sockets first?)

1 User logout (and leave chat)
2 login check, if logged in, "renew chat userIds" (server feature as well)

 */

export function Chat(props) {
    let [chat, setChat] = useState<any>({});
    let [chatUser, setChatUser] = useState<any>({});
    let [transcript, setTranscript] = useState<any[]>([]);
    let [roster, setRoster] = useState<any[]>([]);
 
    let [polling, setPolling] = useState<any>({
        isStopped: false,
        delay: 2000
    });

    let {chatId} = useParams();

    useEffect(() => {
        (async () => {
            addUser();

            // updateChat();
            startPolling();
        })();
    }, [chatId]);

    async function addUser() {
        try {
            const chatUserData = await addUserTochat({
                chatId, 
                accountId: props.account.id
            });
            setChatUser({
                id: chatUserData.id
            });
        } catch(e) {
             // TODO: error handling service?
            console.log('--ERROR', e.message);
        }
    }

    async function updateChat() {
        try {
            const chatData = await requestGetChat({chatId});
            console.log('refresh chat', chatData)
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
    async function startPolling() {
        if (polling.isStopped) return;

        setTimeout(() => {
            if (polling.isStopped) return;
            updateChat();
            startPolling();
        }, polling.delay);
    }

    // TODO: Not working...
    function stopPolling() {
        setPolling({
            isStopped: true,
            delay: 2000
        })
    }


    return (
        <section>
            <h3>Chat: {chat && chat.name} <button onClick={stopPolling}>stop updating</button></h3>

            <Roster roster={roster} />

            <Transcript transcript={transcript} />

            <Composer sendMessage={sendMessage} />
        </section>
    )
}