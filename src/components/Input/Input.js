import React from "react";

import classes from "./Input.module.scss";

function handleChange(e){
    const target = e.target;

    if(target.value.trim().length > 0){
        target.classList.add("is-active");
    }else{
         target.classList.remove("is-active");
    }
}

function Input(props){
    return (
        props.label ?
        (<div className={[classes.wrapper, props.wrapperClass].join(" ")}>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                className={[classes.Input, props.inputClass].join(" ")}
                onBlur={ e => handleChange(e)}
                onChange={e => props.onChange(e)}
            />
            <label htmlFor={props.id}>{props.labelText}</label>
        </div>) :
        (<input
            type={props.type}
            placeholder={props.placeholder}
            className={[classes.Input, props.inputClass].join(" ")}
            onBlur={ e => handleChange(e)}
            onChange={e => props.onChange(e)}

        />)

    )
}

export default Input;