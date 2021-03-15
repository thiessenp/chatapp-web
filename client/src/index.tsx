import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './store/store';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import RouteGuard from './components/AuthGuard';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './style/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}

      <header>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">ChatsApp</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="/">Sign out (todo)</a>
            </li>
          </ul>
        </nav>
      </header>

      <BrowserRouter>
        <Switch>
          {/* TODO: advantage/disadvantages to either:
              <Route path="/path" component={Component} />
              -VS-
              <Route path="/path"><Component></Route>
          */}

          <div className="container-fluid">
            <div className="row">

            {/* NOTE: Remember order matters, so less restrictive at bottom */}
            
            <Route path="/login" component={LoginPage} />

            <RouteGuard path="/chats" component={ChatsPage} />
            {/*-vs- <RouteGuard path="/chats">
                <ChatsPage></ChatsPage>
            </RouteGuard> */}

            {/* TODO: what does adding `exact` do again? */}
            <Route path="/" component={HomePage} />
            {/* <Route path="/">
              <div className="App">
                <header className="App-header">
                  <h1>ChatApp (WIP)</h1>
                  <Link to={`/chats`}>Go to the Chats id</Link>
                </header>
              </div>
            </Route> */}
            </div>
          </div>
        </Switch>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
