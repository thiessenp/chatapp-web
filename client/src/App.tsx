import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        {/* TODO: advantage/disadvantages to either:
            <Route path="/path" component={Component} />
            -VS-
            <Route path="/path"><Component></Route>
        */}

        <Route path="/login" component={LoginPage} />

        <Route path="/chats" component={ChatsPage} />

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
