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
import { useState } from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
  const [token, setToken] = useState("");

  function updateToken(newToken) {
    setToken(newToken);
  }

  return (
    <>
      <NotificationContainer/>
      <Navbar token={token} setToken={setToken}/>
      <MyFeedPage  token={token}/>
    </>
  );
}

export default App;
