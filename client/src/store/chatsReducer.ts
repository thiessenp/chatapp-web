import {
    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAILURE
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


const INITIAL_STATE = [];

export function chatsReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case GET_CHATS_REQUEST:
            console.log(GET_CHATS_REQUEST, action.payload);
            return state;
        case GET_CHATS_SUCCESS:
            console.log(GET_CHATS_SUCCESS, action.payload);
            return [
                ...state,
                ...action.payload
            ];
        case GET_CHATS_FAILURE:
            console.log(GET_CHATS_FAILURE, action.payload);
            return state;
        default:
            return state;
    }
}
