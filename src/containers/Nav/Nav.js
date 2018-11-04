import React from "react";
import {NavLink, Link} from "react-router-dom";

import LogoutButton from "../../components/Button/LogoutButton/LogoutButton";

import classes from "./Nav.module.scss";

function Nav(props){

    return (
        <nav className={classes.wrapper}>
            <p style={{color:"#fff", width: "100%"}}>v 0.9.2 beta</p>
            <div className={classes.__item}>
                <NavLink
                    exact
                    to="/"
                    activeClassName="is-active"
                    className={classes.__item}>
                Dashbord</NavLink>
            </div>
            <div className={classes.__item}>
                <NavLink
                    to="/raporty"
                    activeClassName="is-active"
                    className={classes.__item}>
                Raporty</NavLink>
            </div>
            <div className={classes.__item}>
                <NavLink
                    to="/planowanie"
                    activeClassName="is-active"
                    className={classes.__item}>
                Planowanie</NavLink>
            </div>
            <div className={classes.__item}>
                <NavLink
                    to="/oszczednosci"
                    activeClassName="is-active"
                    className={classes.__item}>
                Oszczędności</NavLink>
            </div>
            <div className={classes.__item}>
                 <NavLink
                    to="/kalendarz"
                    activeClassName="is-active"
                    className={classes.__item}>
                Kalendarz</NavLink>
            </div>
            <div className={classes.__item}>
                <NavLink
                    to="/ustawienia"
                    activeClassName="is-active"
                    className={classes.__item}>
                Ustawienia</NavLink>
            </div>
            <div className={classes.__item}>
                <NavLink
                    to="/konto"
                    activeClassName="is-active"
                    className={classes.__item}>
                Konto</NavLink>
            </div>
            <div className={classes.__item}>
                 <NavLink
                    to="/aplikacja"
                    activeClassName="is-active"
                    className={classes.__item}>
                O aplikacji</NavLink>
            </div>
            <div className={classes.__item}>
                <LogoutButton />
            </div>
        </nav>
    )
}

export default Nav;