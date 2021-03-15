// Import CSS files for Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

import 'react-notifications/lib/notifications.css';

// Import JS files for Bootstrap
import 'jquery/dist/jquery.js'
import 'popper.js/dist/umd/popper.js'
import 'bootstrap/dist/js/bootstrap.js'

// Import my components
import Navbar from './components/Navbar'
import MyFeedPage from './pages/MyFeedPage'
import SubscriptionPage from './pages/MySubs'
import { useState } from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'

function App() {
  const [token, setToken] = useState("");

  function updateToken(newToken) {
    setToken(newToken);
  }

  return (
    <Router>
      <NotificationContainer/>
      <Navbar token={token} setToken={setToken}/>
      
      <div id="page-body">
          <Switch>          
            <Route 
              exact 
              path="/" 
              render={() => (
                <MyFeedPage  token={token}/>
              )}
            />
            <Route
              path="/subscriptions" 
              render={() => (
                <SubscriptionPage  token={token}/>
              )}
            />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
