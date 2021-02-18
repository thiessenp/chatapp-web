import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {requestPostMessage, Poll} from '../services/chatsService';
import {getChatAction, addUserTochat} from '../store/chatsActions';
import {Transcript} from './Transcript';
import {Roster} from './Roster';
import {Composer} from './Composer';


// NOTE: props receives an account - to join the chat
// NOTE: chatId from PATH
// NOTE: receives chats but can ALSO use a reducer
export function Chat(props) {
    let {chatId} = useParams();
    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    // TODO: could also try - useSelector(state => state.chats.find(chat=> chat.id === chatId));
    const chat = useSelector(state => {
        const chat = state.chats.filter(chat => chat.id === chatId);
        if (!chat || !chat[0]) { return state; }
        return chat[0];
    });

    // Update Chat details on new Chat (when navigate to another chat)
    useEffect(() => {
        // Join The Chat (if haven't already)
        if (!chat.chatUserId) {
            dispatch(addUserTochat({chatId, accountId:account.id}));
        }

        // Get The Chat (polling)
        const callback:any = () => { return dispatch(getChatAction({chatId})); }
        const poll = new Poll({callback});

        // Stop polling on leaving the chat
        return () => { poll.stop(); }
    }, [chatId])

    async function sendMessage({content}) {
        const message = {
            chatId: chat.id,
            fromChatUserId: chat.chatUserId,    //chatUser.id,
            toChatUserId: chat.chatUserId,      //chatUser.id,
            content
        };
        requestPostMessage({
            account,
            ...message
        });
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
