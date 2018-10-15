import React from "react";
import {NavLink, Link} from "react-router-dom";

import classes from "./Nav.module.scss";

function Nav(props){

    return (
        <nav className={classes.wrapper}>
            <div style={{color:"#fff", padding: 20, border: "1px solid white"}} >
                "Szukaj..."
            </div>
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
                  <Link to="/login" >Wyloguj</Link>
            </div>
        </nav>
    )
}

export default Nav;