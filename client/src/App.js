import React,{useReducer} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from './components/Login';
import Nav from './components/Nav';
import OtpForm from "./components/OtpForm";
import Admin from "./components/Admin";
import  MarkSheet  from './components/MarkSheet';

import { Provider } from "./store/context";
import { initialState, reducer } from './store/userReducer';

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <Provider value={{ state,dispatch }} >
      <Router>
        <Nav/>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Registration} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/reset_password" component={OtpForm} exact />
          <Route path="/admin" component={Admin} exact />
          <Route path="/stdmarks" component={MarkSheet} exact />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
