import React, { Component } from 'react';
import fire, { GoogleAuthProvider } from "../../../firebase/config";
import {
    withRouter,
} from "react-router-dom";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import classes from "./Register.module.scss";



class Register extends Component {

    registerClickHandler = (e) =>{
        e.preventDefault();

        const database = fire.database();

        const date = new Date();
        const year =  date.getFullYear();
		const month =  date.getUTCMonth() + 1;

        fire.auth().signInWithPopup(GoogleAuthProvider).then( result =>{
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const userID = user.uid;
            const userEmail = user.email;

            const userData = {
                info: {email: userEmail},
                allExpensesCategories: [
                    {
                        cat: 'jedzenie',
                        sub: ['jedznie dom', 'jedzenie miasto', 'jedzenie praca', 'alkohol']
                    },
                    {
                        cat: 'mieszkanie',
                        sub: [
                            'czynsz',
                            'woda i kanalizacja',
                            'prąd',
                            'gaz',
                            'ogrzewanie',
                            'śmieci',
                            'naprawy',
                            'wyposażenie'
                        ]
                    },
                    {
                        cat: 'transport',
                        sub: [
                            'paliwo',
                            'przeglądy i naprawy',
                            'ubezpieczenie',
                            'bilety komunikacja miejsca',
                            'bilety inne',
                            'taxi'
                        ]
                    },
                    {
                        cat: 'telekomunikacja',
                        sub: ['telefon', 'tv', 'internet', 'netflix']
                    },
                    {
                        cat: 'opieka zdrowotna',
                        sub: ['lekarz', 'badania', 'lekarstwa']
                    },
                    {
                        cat: 'ubrania',
                        sub: ['ubrania zwykłe', 'ubrania sportowe', 'buty', 'dodatki']
                    },
                    {
                        cat: 'higiena',
                        sub: ['kosmetyki', 'środki czystości', 'fryzjer', 'kosmetyczka']
                    },
                    {
                        cat: 'dzieci',
                        sub: ['artykuły szkolne', 'zabawki/gry', 'opieka nad dziećmi']
                    },
                    {
                        cat: 'rozrywka',
                        sub: [
                            'kino/teatr',
                            'koncert',
                            'książka',
                            'hobby',
                            'hotel / turystyka'
                        ]
                    },
                    {
                        cat: 'sport',
                        sub: ['siłownia', 'suplementy', 'zawody']
                    },
                    {
                        cat: 'inne wydatki',
                        sub: [
                            'dobroczynność',
                            'prezenty',
                            'sprzęt rtv',
                            'oprogramowanie',
                            'edukacja'
                        ]
                    },
                    {
                        cat: 'spłata długów',
                        sub: ['kredyt hipoteczny', 'kredyt konsumpcyjny', 'pożyczka osobista']
                    },
                    {
                        cat: 'budowanie oszczędności',
                        sub: [
                            'fundusz awaryjny',
                            'fundusz wydatków nieregularnych',
                            'poduszka finansowa',
                            'konto emerytalne',
                            'nadpłata długów',
                            'fundusz wakacje',
                            'fundusz prezenty'
                        ]
                    }
                ],
                allIncomesCategories: [
                    'wynagrodzenie',
                    'premia',
                    'odsetki bankowe',
                    'inne przychody'
                ],
                wallet:{
                    current: {
                        upData: `${year}-${month}`,
                        value: 0
                    }
                }

            }

            database
			.ref(`users/${userID}`)
			.update(userData, function(error) {
				if (error) console.log(error);
            });

            this.props.history.push("/");

          }).catch(function(error) {
            console.log(error);

          });
    }

    render(){
        return(
            <div className={[classes.wrapper, "register__form__wrapper"].join(" ")}>
                <h1>Rejestracja</h1>
                <p>Załóż konto i kontroluj swój budżet</p>
                <form>
                    {/* <Input
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
                        wrapperClass="login-input"/> */}
                    <Button
                        text="Zarejestruj kontem google"
                        className="button--submit"
                        onClick={ e => this.registerClickHandler(e)}
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

export default withRouter(Register);