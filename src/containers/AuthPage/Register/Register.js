import React, { Component } from 'react';

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import classes from "./Register.module.scss";


class Register extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={[classes.wrapper, "register__form__wrapper"].join(" ")}>
                <h1>Rejestracja</h1>
                <p>Załóż konto i kontroluj swój budżet</p>
                <form>
                    <Input
                        label
                        labelText="E-mail"
                        type="text"
                        id="logowanie"
                        wrapperClass="login-input"/>
                    <Input
                        label
                        labelText="Hasło"
                        type="password"
                        id="haslo"
                        wrapperClass="login-input"/>
                    <Input
                        label
                        labelText="Potwierdź hasło"
                        type="password"
                        id="haslo2"
                        wrapperClass="login-input"/>
                    <Button
                        text="Zarejestruj"
                        className="button--submit"
                         />
                </form>
                <div className="login__footer">
                    <Button
                        text="Logowanie"
                        onClick={e=>this.props.toggleForm(e)}
                    />
                    <h2>Masz już konto?</h2>
            </div>
        </div>
        )

    }
}

export default Register;