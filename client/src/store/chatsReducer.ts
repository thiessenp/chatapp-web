// TODO: side effects from functions, instead return var (avoid side effects)

import {
    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAILURE,
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAILURE,
    START_CHAT_POLLING,
    STOP_CHAT_POLLING
} from './chatsActions';


// >>>>>>>>TESTS
import {TEST} from './chatsActions';
export interface ITest {
    data: string
}
const INITIAL_TEST_STATE: ITest = {
    data: 'test start'
}
export function testReducer(state=INITIAL_TEST_STATE, action) {
    switch(action.type) {
        case TEST:
            return {
                ...state,
                data: 'test from case TEST+' + action.payload.data
            }
        default:
            return state;
    }
}
// >>>>>>>>END TESTS


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
 
        // POLLING CHAT
        case START_CHAT_POLLING:
            console.log(START_CHAT_POLLING, action);
            return state;
        case STOP_CHAT_POLLING:
            console.log(STOP_CHAT_POLLING, action);
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

    // New chats so update *everything* (yeeehaw)
    return newChats;
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