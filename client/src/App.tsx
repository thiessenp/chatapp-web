import {useEffect} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import RouteGuard from './components/AuthGuard';
import LoginPage from './pages/LoginPage/LoginPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './App.scss';


import { useDispatch, useSelector } from 'react-redux';


function App() {
  // Replaced <BrowserRouter history={history}> with <Router history={history}> because Router supports history
  // BUUUUUUT no longer routes... :)


  const testData = useSelector(state => state.test);
  const dispatch = useDispatch();
  // test it once
  useEffect(() => { 
    dispatch({type: 'TEST', payload: {data: 'App dispatch'} }); 
  }, []);


  return (
    <BrowserRouter>
      <Switch>

        {/* TODO: advantage/disadvantages to either:
            <Route path="/path" component={Component} />
            -VS-
            <Route path="/path"><Component></Route>
        */}

        <Route path="/login" component={LoginPage} />

        <RouteGuard path="/chats" component={ChatsPage}  />
        {/*-vs- <RouteGuard path="/chats">
            <ChatsPage></ChatsPage>
        </RouteGuard> */}

        {/* TODO: what does adding `exact` do again? */}
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <h1>ChatApp (WIP)</h1>
              <Link to={`/chats`}>Go to the Chats id</Link>
              <h2>test: {testData.data}</h2>
            </header>
          </div>
        </Route>

        {/* Remember order matters, so less restrictive at bottom */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
