// TODO: BUG: add a new chat (postman), it adds fine but state seems messed up on Chat page
// TODO: side effects from functions, instead return var (avoid side effects)
import {
    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAILURE,
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAILURE
} from './chatsActions';


export interface IChat {
    id: string, //uuid
    name: string,
    roster: [],
    transcript: []
}

const INITIAL_STATE = [];

export function chatsReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
 
        // CHATS
        case GET_CHATS_REQUEST:
            return state;
        case GET_CHATS_SUCCESS:
            return updateChats({oldChats: state, newChats: action.payload});
        case GET_CHATS_FAILURE:
            // TODO:
            return state;
 
        // CHAT
        case GET_CHAT_REQUEST:
            return state;
        case GET_CHAT_SUCCESS: {
            const newChat:IChat = action.payload;
            const newChatState = state.map((chat:IChat) => {
                if (chat.id !== newChat.id) { return chat; }
                if (!isChatDiff({oldChat:chat, newChat})) { return chat}
                return newChat;
            });
            return newChatState;
        }
        case GET_CHAT_FAILURE:
            console.log(GET_CHAT_FAILURE, action);
            // TODO:
            return state;

        default:
            return state;
    }
}


/**
 * Updates chats by over writing all chats if there is a different number of
 * chats. (chats have been added/removed so update)
 * 
 * TODO: could compare transcript/roster for changes per chat for update diff.
 */
function updateChats({oldChats, newChats}) {
    // New session? add any new chats
    if (oldChats.length === 0) { return newChats; }

    // No new chats
    if (oldChats.length === newChats.length) { return oldChats; }

    // Add any new Chats
    // NOTE: array.filter wasn't working for me so went with foreach (try later?)
    let newChatsDiff: Array<any> = [];
    newChats.forEach(newChat => {
        let notFound = true;
        oldChats.forEach(oldChat => {
            if (newChat.id === oldChat.id) { notFound = false; }
        });
        if (notFound) { newChatsDiff.push(newChat); }
    });

    // TODO:
    // Remove any removed Chats (server API as well)

    return [...oldChats, ...newChatsDiff];
}


function isChatDiff({oldChat, newChat}) {
    if (!oldChat || !newChat) { return false; }

    // Diff the Chat
    if (
        (oldChat.transcript.length !== newChat.transcript.legnth) || 
        (oldChat.roster.length !== newChat.roster.length)
    ) {
        return true;
    }

    // No diff in chat
    return false;
}
