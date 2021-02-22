import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {healthReducer} from './healthReducer';
import {accountReducer} from './accountReducer';
import {chatsReducer} from './chatsReducer';


const rootReducer = combineReducers({
    health: healthReducer,
    account: accountReducer,
    chats: chatsReducer,
});

// not needed since devtools?
// import { createLogger } from 'redux-logger';
// const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,

    /* preloadedState, */

    // Access debug console (load in new tab if not show first try)
    // Download also from chrome: "Redux DevTools for Chrome"
    composeWithDevTools(
        applyMiddleware(
            // for fetching stuff async
            thunkMiddleware,
            // not needed since devtools?
            // ,loggerMiddleware 
        )
    ),
);
