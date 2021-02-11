import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';

import {testReducer, chatsReducer} from './chatsReducer';


const rootReducer = combineReducers({
    test: testReducer,
    chats: chatsReducer
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
