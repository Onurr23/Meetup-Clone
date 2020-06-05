import React from 'react';
import './App.css';
import Navi from "./Components/Navi";
import {Switch, Route} from "react-router-dom";
import Enterance from "./Components/Enterance";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import CreateEvent from "./Components/CreateEvent";
import EventDetail from "./Components/EventDetail";
import EditEvent from "./Components/EditEvent";
import Profile from "./Components/Profile";
import Chat from "./Components/Chat";



function App() {
  return (
    <div>
      <Navi/>


          <Switch>

          <Route exact path='/' component={Enterance} />
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/create' component={CreateEvent}/>
          <Route exact path='/details' component={EventDetail} />
          <Route exact path='/edit' component={EditEvent}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/chat' component={Chat}/>


          </Switch>

    </div>
  );
}

export default App;
