import {requestGetHealth} from '../services/healthService';


// Note: could group into an object also
export const GET_HEALTH_REQUEST = 'GET_HEALTH_REQUEST';
export const GET_HEALTH_SUCCESS = 'GET_HEALTH_SUCCESS';
export const GET_HEALTH_FAILURE = 'GET_HEALTH_FAILURE';

export function getHealthAction() {
    return async (dispatch) => {
        dispatch(request());

        try {
            const healthData = await requestGetHealth();
            dispatch(success(healthData));
        } catch(e) {
            dispatch(failure(e));
        }
    };

    function request() { return {type: GET_HEALTH_REQUEST, payload: {}} }
    function success(accountResult) { return {type: GET_HEALTH_SUCCESS, payload: accountResult} }
    function failure(error) { return {type: GET_HEALTH_FAILURE, payload: error} }
}

// TODO: logoutAction() - redirect login

