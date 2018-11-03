import React from 'react';
import fire from "../../../firebase/config";
import {
    withRouter,
} from "react-router-dom";

import classes from "./Login.module.scss";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";


function Login(props) {

    let userName;
    let password;

    function loginHandler(e){
        e.preventDefault();


        /* Test acc
        test@test.pl
        test123456
        */
        fire.auth().signInWithEmailAndPassword(userName, password)
        .then( ()=> {
            props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function changeHandler(e){
        const target = e.target;
        if(target.id === "email-input"){
            userName = target.value;
        }else{
            password = target.value;
        }
        console.log(userName);
        console.log(password);
    }



    return(
        <div className={[classes.wrapper, "login__form__wrapper"].join(" ")}>
            <h1>Logowanie</h1>
            <p>Witaj ponownie. Miło Cię widzieć :)</p>
            <form>
                <Input
                    label
                    labelText="E-mail"
                    type="text"
                    id="email-input"
                    wrapperClass="login-input"
                    onChange={changeHandler}
                    />
                <Input
                    label
                    labelText="Hasło"
                    type="password"
                    id="password-input"
                    wrapperClass="login-input"
                    onChange={changeHandler}
                    />
                <Button
                    text="Zaloguj"
                    className="button--submit"
                    onClick={ e=> loginHandler(e)} />
            </form>
            <div className="login__footer">
                <h2>Nie masz konta?</h2>
                <Button
                    text="Rejestracja"
                    onClick={e=>props.toggleForm(e)}
                />
            </div>

        </div>

    )


}

export default withRouter(Login)