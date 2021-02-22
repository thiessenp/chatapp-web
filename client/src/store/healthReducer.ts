import {
    GET_HEALTH_REQUEST,
    GET_HEALTH_SUCCESS,
    GET_HEALTH_FAILURE
} from './healthActions';

import {HEALTH} from './healthActions';


export interface IHealth {
    status: string
}

// TODO: add ENUM for health states
const INITIAL_STATE:IHealth = {
    status: HEALTH.UNKNOWN
};

export function healthReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
 
        // LOGIN ACCOUNT
        case GET_HEALTH_REQUEST:
            console.log('GET_HEALTH_REQUEST', action)
            return state;
        case GET_HEALTH_SUCCESS: {
            const healthData:IHealth = action.payload;
            console.log('GET_HEALTH_SUCCESS', healthData)
            return {...state, ...healthData};
        }
        case GET_HEALTH_FAILURE:
            // TODO:
            console.log('Error Reducer GET_HEALTH_FAILURE', action);
            return state;

        default:
            return state;
    }
}