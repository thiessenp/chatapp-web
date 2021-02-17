import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';

import {accountReducer} from './accountReducer';
import {chatsReducer} from './chatsReducer';


const rootReducer = combineReducers({
    account: accountReducer,
    chats: chatsReducer,
});

// TODO - want a logger - so verbose!
// const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware // for fetch stuff?
        // ,loggerMiddleware
    )
);
