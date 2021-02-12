import {
    GET_CHAT_LIST_REQUEST,
    GET_CHAT_LIST_SUCCESS,
    GET_CHAT_LIST_FAILURE,
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAILURE
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
 
        // CHAT_LIST
        case GET_CHAT_LIST_REQUEST:
            return state;
        case GET_CHAT_LIST_SUCCESS:
            return updateChatList({oldChats: state, newChats: action.payload});
        case GET_CHAT_LIST_FAILURE:
            console.log(GET_CHAT_LIST_FAILURE, action.payload);
            // TODO:
            return state;
 
        // CHAT
        case GET_CHAT_REQUEST:
            console.log(GET_CHAT_REQUEST, action.payload);
            return state;
        case GET_CHAT_SUCCESS:
            console.log(GET_CHAT_SUCCESS, action.payload);



            const newChat = updateChat({chats: state, newChat: action.payload});
            console.log('newChat', newChat);
            return {
                // TODO - comparison by notifying add/remove chat in list?
                // ...state,
                ...action.payload
            };
        case GET_CHAT_FAILURE:
            console.log(GET_CHAT_FAILURE, action.payload);
            return state;
 
        default:
            return state;
    }
}

/**
 * Updates the existing chatList, only add or remove chats NEVER override since
 * the chatList stores chat data.
 * 
 * TODO:
 * - diff to remove a chat
 */
function updateChatList({oldChats, newChats}) {
    // New session? add any new chats
    if (oldChats.length === 0) {
        return newChats;
    }

    // No new chats
    if (oldChats.length === newChats.length) {
        return oldChats;
    }

    // Diff the array lengths for new chats
    const diffLength = oldChats.length - newChats.length;
    if (diffLength <= 0) {
        return oldChats;
    }

    // Add new chats to existing chants
    return [
        ...oldChats,
        ...newChats.splice(diffLength)
    ];
}


function updateChat({chats, newChat}) {
    console.log('chats', chats, 'newChat', newChat);

    for (let i=0, l=chats.length; i < l; i++) {
        if (newChat.id === chats[i].id) {
            return chats[i];
        }
    }
}