import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
// import {createBrowserHistory } from 'history';
import RouteGuard, { /*ProvideAuth, PrivateRoute*/} from './components/AuthGuard';
import LoginPage from './pages/LoginPage/LoginPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './App.scss';

// const history = createBrowserHistory();

function App() {
  // Replaced <BrowserRouter history={history}> with <Router history={history}> because Router supports history
  // BUUUUUUT no longer routes... :)
  return (
    <BrowserRouter>
      <Switch>

        {/* TODO: advantage/disadvantages to either:
            <Route path="/path" component={Component} />
            -VS-
            <Route path="/path"><Component></Route>
        */}

        <Route path="/login" component={LoginPage} />

        {/* <Route path="/chats" component={ChatsPage} /> */}
        <RouteGuard path="/chats" component={ChatsPage}  />
        {/* <PrivateRoute path="/chats">
            <ChatsPage></ChatsPage>
        </PrivateRoute> */}

        {/* TODO: what does adding `exact` do again? */}
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <h1>Hello6</h1>
            </header>
          </div>
        </Route>

        {/* Remember order matters, so less restrictive at bottom */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
