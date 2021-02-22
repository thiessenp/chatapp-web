import {
    ACTIVE_CHAT
} from './chatDataActions';


const INITIAL_STATE = {};

export function chatDataReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVE_CHAT:
            const activeChatId = action.payload.activeChatId;
            return {...state, activeChatId};

        default:
            return state;
    }
}