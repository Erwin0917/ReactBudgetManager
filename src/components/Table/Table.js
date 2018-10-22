import React, { Component  } from "react";
import * as _ from "lodash";

import Button from "../Button/Button";

import classes from "./Table.module.scss"




class Table extends Component {

    state={
        inputs: null,
        listType:null

    }

    constructor(props){
        super(props);

        this.debounceHandler = _.debounce( this.readValue, 350);
        this.wrapper = React.createRef();

    }


    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.inputs && nextState.inputs.length === this.state.inputs.length){

            return false;
        }else{
            return true;
        }
    }

    componentDidUpdate = ()=>{
        this.sumAll();
    }

    readValue = (e, target) =>{
        const inputValue = target.value;
        const inputName = target.parentNode.previousSibling.textContent;


        let stateSnap = this.state.inputs;

        if(this.state.listType === "tags"){
            const categoryName = target.closest(`.${classes.tags__wrapper}`).previousSibling.querySelector("label").textContent;

            stateSnap[categoryName] = stateSnap[categoryName].map( elem =>{
                if(elem[0] === inputName){
                    elem[1] = inputValue
                }
               return elem;
            } )

        }else{
            stateSnap = stateSnap.map( elem =>{
                if(Object.keys(elem)[0] === inputName){
                    elem[inputName] = inputValue
                }
                return elem;
            } )
        }

        this.setState({
            ...this.state,
            inputs: stateSnap
        })
        this.sumAll();

    }


    sumAll = () =>{
        console.log("sum all");
        const summaryInput = this.wrapper.current.querySelector(`.list__header__summary input`);
        const inputsMain = [...this.wrapper.current.querySelectorAll(`.${classes.content__wrapper} .category__item__wrapper input`)];
        const inputsTag = [...this.wrapper.current.querySelectorAll(`.${classes.content__wrapper} .currentTag__item__wrapper input`)];


        if(inputsTag.length > 0 ){

            inputsMain.map( input =>{
                let tagSum = 0;
                const tagInputsInside = [...input.closest(`.${classes.item}`).nextSibling.querySelectorAll("input")];

                tagInputsInside.map( tagInput =>{

                    tagSum = tagInput.value ? tagSum + parseInt(tagInput.value) : tagSum;

                    return tagInput;
                })
                input.value = tagSum;

                return input;
            })


        }

        let sumVal = 0;

        inputsMain.map( input =>{

            if(input.value){
                sumVal = sumVal + Number.parseInt(input.value);
            }
            return input;
        })

        summaryInput.value = sumVal;




    }


    setInputsInState = data =>{
        let inputsArr = [];
        let listType;
        let tagArr = {}

        data.map( (item, catIndex) => {
            const itemName = item.cat ? item.cat : item;
            const tagList = item.cat ?  item.sub : null;


            if(tagList){
                tagArr[itemName] =[];

                tagList.map( (tag, index)=>{
                    let currentTag = typeof tag === "object" ? tag[0][0] : tag;
                    let val = typeof tag === "object" ? tag[0][1] : null;

                    if(currentTag){
                        tagArr[itemName].push([currentTag, val]);
                    }
                    return tag;
                })
                listType = "tags"

            }else{
                let curCatName;
                let curCatVal;
                if(typeof itemName === "object"){
                    curCatName = itemName[0][0];
                    curCatVal = itemName[0][1];
                }else{
                    curCatName = itemName;
                    curCatVal = null;
                }
                inputsArr.push({[curCatName]: curCatVal});
                listType = "category";
            }
            return item;

        })

        if(listType === "tags") inputsArr = tagArr;

        this.setState({
            ...this.setState,
            inputs: inputsArr,
            listType: listType
        })
    }

    buildTableItems = data =>{
        if( !data ) return "Pobieranie danych";

        this.setInputsInState(data);

        if(this.state.inputs){
            return Object.keys(this.state.inputs).map( (key, i) =>{
                let hasTags = Array.isArray(this.state.inputs[key]) ? true : false;

                const categoryName = hasTags ? key : Object.keys(this.state.inputs[key])[0];

                let catValue = hasTags ? "" : this.state.inputs[key][categoryName];

                if(catValue === null) catValue = "";

                return (
                <li className={classes.item__wrapper} key={categoryName}>
                    <div className={classes.item}>
                        <label htmlFor={categoryName} className={classes.item__title}>{categoryName}</label>
                        {
                            this.state.listType === "category" ?
                            <div className="list__item__value__wrapper category__item__wrapper">
                                {
                                    hasTags ?
                                    <input name={categoryName} id={categoryName} onChange={e => this.debounceHandler(e, e.currentTarget)}/> :
                                    <input name={categoryName} id={categoryName} onChange={e => this.debounceHandler(e, e.currentTarget)} defaultValue={catValue}/>

                                }
                                PLN
                            </div> :
                            <div className="list__item__value__wrapper category__item__wrapper">
                                <input name={categoryName} id={categoryName} disabled/>PLN
                            </div>
                        }
                    </div>
                    {hasTags ?
                        <ul className={classes.tags__wrapper}>
                            {this.state.inputs[key].map( (tag, index)=>{
                                const tagName = tag[0];
                                let tagValue = tag[1];

                                if(!tagValue) tagValue = "";
                                return (
                                        <li className={classes.item} key={index}>
                                            <label htmlFor={tagName} className={classes.item__title}>{tagName}</label>
                                            <div className="list__item__value__wrapper currentTag__item__wrapper">

                                                <input name={tagName} id={tagName} onChange={e => this.debounceHandler(e, e.currentTarget)} defaultValue={tagValue}/>PLN
                                            </div>
                                        </li>
                                )})
                            }
                        </ul>
                        : null
                    }

                </li>)
        })

    }
    }



    render(){



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
                   {this.buildTableItems(this.props.data)}
                </ul>
                <div className={classes.footer}>
                    <Button text="Zapisz" onClick={() => this.props.onSave(this.state.inputs)}/>
                </div>
            </div>
        )
    }
}

export default Table;