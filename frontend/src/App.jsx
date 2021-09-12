import React from 'react';
import './App.css';
import Login from './components/Login';
import Headers from './components/Headers';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import { useAuth } from './provider/AuthProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from 'react-router-dom';
function App() {
  const { auth } = useAuth();
  return (
    <div>
      <Headers />
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/products">
              {auth ? <AdminPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/Register">
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <Register />
      <AdminPage /> */}
    </div>
  );
}

export default App;
