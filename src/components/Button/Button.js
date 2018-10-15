import React from "react";

import classes from "./Button.module.scss"

function Button(props){

    return (
        <button
        className={[classes.def, props.className].join(" ")}
        onClick={props.onClick}>
        {props.text}
        </button>
    )
}

export default Button;