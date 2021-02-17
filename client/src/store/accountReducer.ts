import {
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE
} from './accountActions';
import {account} from '../services/accountService';


export interface IAccount {
    id: string,
    username: string,
    idToken: string,
    //TODO source of bug? on check auth need to check expiresIn also?
    //Actually get a 401 so better with a account action that triggers a redirect to login and resets all state
    expiresIn: string,
    // TODO: good way to do it? (function with expiresCheck, not sure)
    isAuthenticated: boolean
}

const INITIAL_STATE:IAccount = {
    id: '',
    username: '',
    idToken: '',
    expiresIn: '',
    isAuthenticated: false
};

export function accountReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
 
        // LOGIN ACCOUNT
        case GET_LOGIN_REQUEST:
            console.log('GET_LOGIN_REQUEST', action)
            return state;
        case GET_LOGIN_SUCCESS: {
            const accountData:IAccount = account.getAccount();
            console.log('GET_LOGIN_SUCCESS', accountData)
            return accountData;
        }
        case GET_LOGIN_FAILURE:
            // TODO:
            console.log('Error Reducer GET_LOGIN_FAILURE', action);
            return state;

        default:
            return state;
    }
}