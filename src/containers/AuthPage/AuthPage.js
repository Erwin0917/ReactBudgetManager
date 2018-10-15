import React, { Component } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';


import classes from './AuthPage.module.scss';
import growth from  "../../img/growth.svg"
import piggyBank from "../../img/piggy-bank.svg"

class AuthPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: true
		};
	}

	toggleFomHandle = e => {
		e.preventDefault();
		const loginWrapper = document.querySelector('.login__form__wrapper');
		const registerWrapper = document.querySelector('.register__form__wrapper');

		if (this.state.login) {
			this.setState({ login: false });
			loginWrapper.style.left = '-100%';
			loginWrapper.style.transform = 'translateX(0)';
			registerWrapper.style.left = '50%';
			registerWrapper.style.transform = 'translateX(-50%)';
		} else {
			this.setState({ login: true });
			loginWrapper.style.left = '50%';
			loginWrapper.style.transform = 'translateX(-50%)';
			registerWrapper.style.left = '100%';
			registerWrapper.style.transform = 'translateX(0)';
        }
         /* fire.auth().signOut().then(function () {
             console.log("wylogowano");
         }).catch(function (error) {
             console.log("błąd wylogowania");
         }); */
	};

	render() {
		return (
			<div className={classes.site}>
				<div className={classes.wrapper}>
					<div
						className={
							this.state.login
								? classes.panel__container
								: [classes.panel__container, 'container--register'].join(' ')
						}
					>
						<Login toggleForm={e => this.toggleFomHandle(e)} getValide={this.props.getValide} />
						<Register toggleForm={e => this.toggleFomHandle(e)} />
					</div>
					<div className={classes.info__wrapper}>
						<div className={classes.info}>
                            <h2>Kontroluj swoje wydatki</h2>
							<img src={piggyBank} alt={piggyBank}/>
						</div>
						<div className={classes.info}>
                            <img src={growth} alt={{growth}}/>
                            <h2>Przejrzyste zarządzanie prywatnymi finansami</h2>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AuthPage;
