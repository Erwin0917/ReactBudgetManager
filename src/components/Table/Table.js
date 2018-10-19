import React, { Component  } from "react";
import * as _ from "lodash";

import Button from "../Button/Button";

import classes from "./Table.module.scss"




class Table extends Component {

    state={
        currentValue: null
    }

    constructor(props){
        super(props);

        this.debounceHandler = _.debounce( this.readValue, 200)
    }


    readValue = (e, target) =>{
        const value = target.value;
        console.log(target.parentNode.previousSibling.textContent);


    }




    render(){

        const buildTableItems = (data) =>{
            if( !data ) return "Pobieranie danych";
            return data.map( (item, index) => {
                const itemName = item.cat ? item.cat : item;
                const tagList = item.cat ?  item.sub : null;
                return(
                    <li className={classes.item__wrapper} key={index}>
                        <div className={classes.item}>
                            <label htmlFor={itemName} className={classes.item__title}>{itemName}</label>
                            {
                                tagList ?
                                <div className="list__item__value__wrapper">
                                    <input name={itemName} id={itemName} disabled/>PLN
                                </div>
                                :
                                <div className="list__item__value__wrapper">
                                    <input name={itemName} id={itemName} onChange={e => this.debounceHandler(e, e.currentTarget)}/>PLN
                                </div>
                            }
                        </div>
                        {tagList ? (
                            <ul className={classes.tags__wrapper}>
                            {tagList.map( (tag, index)=>{
                                return (

                                        <li className={classes.item} key={`${tag}-${index}`}>
                                            <label htmlFor={tag} className={classes.item__title}>{tag}</label>
                                            <div className="list__item__value__wrapper">
                                                <input name={tag} id={tag} onChange={e => this.debounceHandler(e, e.currentTarget)}/>PLN
                                            </div>
                                        </li>

                                )})
                            }
                            </ul>
                            ): null}
                    </li>
                )

            });
        }

        return(
            <div className={[classes.wrapper, classes.wrapper__small].join(" ")}>
                <div className={classes.header}>
                    <h2 className={classes.title}>{this.props.tableTitle}</h2>
                    <div className="list__header__summary">
                        <label htmlFor={`summary-${(this.props.tableTitle).split(" ")[1]}`} >Razem:</label>
                        <input id={`summary-${(this.props.tableTitle).split(" ")[1]}`} disabled/>PLN
                    </div>
                </div>
                <ul className={classes.content__wrapper}>
                   {buildTableItems(this.props.data)}
                </ul>
                <div className={classes.footer}>
                    <Button text="Zapisz" onClick={this.props.onSave(this.state.currentValue)}/>
                </div>
            </div>
        )
    }
}

export default Table;