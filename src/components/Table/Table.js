import React, { Component  } from "react";
import * as _ from "lodash";

import Button from "../Button/Button";

import classes from "./Table.module.scss"




class Table extends Component {

    state={
        currentValue: [],

    }

    constructor(props){
        super(props);

        this.debounceHandler = _.debounce( this.readValue, 350);
        this.wrapper = React.createRef();

    }

    componentDidMount() {
        console.log();
    }

    componentDidUpdate(){
        //this.sumAll();
    }

    readValue = (e, target) =>{



        this.sumAll();

    }


    sumAll = () =>{
        console.log("sum all");
        const summaryInput = this.wrapper.current.querySelector(`.list__header__summary input`);
        const inputsMain = [...this.wrapper.current.querySelectorAll(`.${classes.content__wrapper} .category__item__wrapper input`)];
        const inputsTag = [...this.wrapper.current.querySelectorAll(`.${classes.content__wrapper} .currentTag__item__wrapper input`)];

        let stateSnap = this.state.currentValue;
        let newState=[];
        console.log(stateSnap);

        if(inputsTag.length > 0 ){

            inputsMain.map( input =>{
                let tagSum = 0;
                const tagInputsInside = [...input.closest(`.${classes.item}`).nextSibling.querySelectorAll("input")];

                tagInputsInside.map( tagInput =>{

                    tagSum = tagInput.value ? tagSum + parseInt(tagInput.value) : tagSum;
                })
                input.value = tagSum;

            })

            inputsTag.map( tagInput => {
                const name =tagInput.parentNode.previousSibling.textContent;
                const value = tagInput.value;

                const newVal = this.upDateCurrentValue(name, value, stateSnap);

                if(newVal) newState.push(newVal);



            })
        }

        let sumVal = 0;

        inputsMain.map( input =>{
            if(inputsTag.length === 0){
                const name =  input.parentNode.previousSibling.textContent;
                const value = input.value;

                /* if(this.upDateCurrentValue(name, value) ){
                    newState = (this.upDateCurrentValue(name, value));
                } */

            }
            if(input.value){
                sumVal = sumVal + Number.parseInt(input.value);
            }
            return input;
        })

        summaryInput.value = sumVal;

        console.log("przed update State");
        console.log(newState);

        console.log("właściwie przekazany array");
        console.log(newState[0]);
        this.setState(
            {...this.state,
            currentValue: newState[0]}
        )


    }

    upDateCurrentValue = (name, value, stateSnap) =>{
        let object = [name, value];

        if( object.length > 0 && object[1].length > 0){
            if(stateSnap.length === 0){
                console.log("dodaj item jeśli state pusty");
                stateSnap.push(object)
            }else{
                stateSnap.map( (item, i) =>{
                    console.log(i);

                    if( item.indexOf(name) === -1){
                        console.log("dodaj do listy");
                        console.log(item);
                        console.log(name);
                        console.log(object);
                        stateSnap.push(object)
                    }else{
                        let index = item.indexOf(name);
                        stateSnap.slice(index, 1)
                        stateSnap.push(object);

                    }
                })

            }

            return stateSnap;
        }else return


    }



    render(){


        const buildTableItems = data =>{
            if( !data ) return "Pobieranie danych";
            return data.map( (item, index) => {
                const itemName = item.cat ? item.cat : item;
                const tagList = item.cat ?  item.sub : null;

                return(
                    <li className={classes.item__wrapper} key={index}>
                        <div className={classes.item}>
                            {
                                typeof itemName === "object" ?
                                <label htmlFor={itemName[0][0]} className={classes.item__title}>{itemName[0][0]}</label> :
                                <label htmlFor={itemName} className={classes.item__title}>{itemName}</label>
                            }

                            {
                                tagList ?
                                <div className="list__item__value__wrapper category__item__wrapper">
                                    <input name={itemName} id={itemName} disabled/>PLN
                                </div>
                                :
                                <div className="list__item__value__wrapper category__item__wrapper">
                                    {
                                         typeof itemName === "object" ?
                                         <input name={itemName[0][0]} id={itemName[0][0]} onChange={e => this.debounceHandler(e, e.currentTarget)} defaultValue={itemName[0][1]}/> :
                                         <input name={itemName} id={itemName} onChange={e => this.debounceHandler(e, e.currentTarget)}/>
                                    }
                                   PLN
                                </div>
                            }
                        </div>
                        {tagList ? (
                            <ul className={classes.tags__wrapper}>
                            {tagList.map( (tag, index)=>{
                                let currentTag = typeof tag === "object" ? tag[0][0] : tag;
                                let val = typeof tag === "object" ? tag[0][1] : null;

                                return (
                                        <li className={classes.item} key={`${currentTag}-${index}`}>
                                            <label htmlFor={currentTag} className={classes.item__title}>{currentTag}</label>
                                            <div className="list__item__value__wrapper currentTag__item__wrapper">
                                                {
                                                    val ?
                                                    <input name={currentTag} id={currentTag} onChange={e => this.debounceHandler(e, e.currentTarget)} defaultValue={val}/> :
                                                    <input name={currentTag} id={currentTag} onChange={e => this.debounceHandler(e, e.currentTarget)}/>
                                                }PLN
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
            <div className={[classes.wrapper, classes.wrapper__small].join(" ")} ref={this.wrapper}>
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
                    <Button text="Zapisz" onClick={() => this.props.onSave(this.state)}/>
                </div>
            </div>
        )
    }
}

export default Table;