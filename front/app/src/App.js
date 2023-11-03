import React, { useContext, useEffect } from 'react';

import './App.css';
import { Employees } from './containers/Employees';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


import { Management } from './containers/Management';
import { EmployeeTop } from './containers/employeeSide/Top';
import { Login } from './components/signin/Login';

import { AuthContext, AuthProvider } from './contexts/auth';
import { SnackbarProvider } from './contexts/snackBar';
import { SignUp } from './components/signin/SignUp';
import { Chat } from './containers/Chat';
import { ConfigProvider } from './contexts/config';
import { BadgeProvider } from './contexts/badge';
import { Top } from './components/shared/Top';

const PrivateRoute = ({ component: Component, ...rest }) => {
const auth = useContext(AuthContext);

return (

      <Route
        render={props =>
          auth.state.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login"/>
          )
        }
        {...rest}
      />
  
)};



const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);
 
  return (
  <Route
    render={props =>
      (auth.state.loggedIn && auth.state.chief) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
    {...rest}
  />)

  }


const  App = () => (
 
  <Router>
    <div>

      <Route exact path="/" component={Top} />
      <BadgeProvider>
      <ConfigProvider>
      <AuthProvider>  
      <SnackbarProvider>
       
        <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      
            <AuthenticatedRoute
                exact
                path="/Dashboard"
                component={Management} 
            />
            <AuthenticatedRoute
                exact
                path="/employees"
                component={Employees} 
            />
            
            <PrivateRoute 
              exact 
              path="/employeeDashboard" 
              component={EmployeeTop}
            />
            <PrivateRoute 
            exact 
            path="/chat" 
            component={Chat}
          />
      
        </Switch> 
        </SnackbarProvider>
        </AuthProvider>
      </ConfigProvider>
      </BadgeProvider>
    
  </div>
</Router>


  );

export default App;
