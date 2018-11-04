import React from "react";
import {Link} from "react-router-dom";
import firebase from '../../../firebase/config';

const LogoutButton = props => {

    const logout = ()=>{
        firebase.auth().signOut().then(function() {
                alert("Wylogowano");
          }).catch(function(error) {
                alert("Nieudane wylogowanie");
                console.log(error);
          });
    }

    return <Link to="/login" onClick={logout()}>Wyloguj</Link>
}

export default LogoutButton;