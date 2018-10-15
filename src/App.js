import React, { Component } from 'react';
import "./utils/reset.css";
import "./App.scss"

import fire  from "./firebase/config";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import AuthPage from "./containers/AuthPage/AuthPage";
import Home from "./containers/Home/Home";




class App extends Component {

  state = {
    user:null,
    isLogged: false,
    processing: true
  }


  componentDidMount() {
    this.authListener();

  }


  authListener = ()=>{

    fire.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user,
          isLogged: true,
          processing: false
        });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({
          user: null,
          isLogged: false,
          processing: false
        });
        localStorage.removeItem('user');
      }
    } )

  }




  render() {

const PrivateRoute = ({component: Component, ...rest}) =>{
  if(this.state.processing){
    return "Autoryzacja..."
  }else{

    return(
      <Route {...rest}
        render={props =>
         this.state.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login'
          }}
          />
        )
        }
      />
    )
  }

}

    return (
      <Router >
        <div className="App">
          {/* <Route  component={notFound}/> */}
          <Switch>
            <Route exact path='/login' component={() => <AuthPage getValide={this.getValide}/>}  />
            <PrivateRoute path={'/'} component={Home} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;

