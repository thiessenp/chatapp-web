import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RouteGuard from './components/AuthGuard';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './App.scss';


function App() {
  // Replaced <BrowserRouter history={history}> with <Router history={history}> because Router supports history
  // BUUUUUUT no longer routes... :)

  return (
    // <section className="App">
      <BrowserRouter>
        <Switch>
          {/* TODO: advantage/disadvantages to either:
              <Route path="/path" component={Component} />
              -VS-
              <Route path="/path"><Component></Route>
          */}

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

          {/* NOTE: Remember order matters, so less restrictive at bottom */}
        </Switch>
      </BrowserRouter>
    // </section>
  );
}

export default App;
