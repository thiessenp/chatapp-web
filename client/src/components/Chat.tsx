import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {requestGetChat} from '../services/chatsService';
import {Transcript} from './Transcript';
import {Roster} from './Roster';
import {Composer} from './Composer';
import {requestPostMessage, requestAddUserTochat} from '../services/chatsService';

import {/*getChatAction,*/ startChatPolling, stopChatPolling} from '../store/chatsActions';


// NOTE: props receives an account - to join the chat
// NOTE: chatId from PATH
// NOTE: receives chats but can ALSO use a reducer
export function Chat(props) {
    let {chatId} = useParams();

    // User info so can send a message - I think?
    let [chatUser, setChatUser] = useState<any>({});

    const dispatch = useDispatch();

    const chat = useSelector(state => {
        const chat = state.chats.filter(chat => chat.id === chatId);
        if (!chat || !chat[0]) { return state; }
        return chat[0];
    });


    // CAREFUL: infinite loops below if change - TODO readmore about hook lifecycle
    useEffect(() => {
        (async () => {
            // if (!chatUser.id) {
                addUser();
            // }

        })();
    }, [chatId]);

    useEffect(() => {
        console.log('new chatId', chatId)
        dispatch(startChatPolling({chatId}));
        return () => { dispatch(stopChatPolling({chatId})); }
    }, [chatId])

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

    return (
        <section>
            <h3>Chat: {chat && chat.name}</h3>

           { chat && chat.transcript && chat.roster &&
                <>
                    <Roster roster={chat.roster} />
                    <Transcript transcript={chat.transcript} />
                </>
            }

            <Composer sendMessage={sendMessage} />
        </section>
    )
}
