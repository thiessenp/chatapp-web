import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {requestPostMessage, requestAddUserTochat, Poll} from '../services/chatsService';
import {getChatAction} from '../store/chatsActions';
import {Transcript} from './Transcript';
import {Roster} from './Roster';
import {Composer} from './Composer';


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
        const callback:any = () => { return dispatch(getChatAction({chatId})); }
        const poll = new Poll({callback});
        return () => { poll.stop(); }
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
        const response = await requestPostMessage(message);
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
