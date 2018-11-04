import React,{ Component } from "react";

import classes from "./Select.module.scss";


function getAllSiblings(element, parent) {
    const children = [...parent.children];
    return children.filter(child => child !== element);
}

class Select extends Component {

    state = {
        currentElements: []
    }

    constructor(props){
        super(props);
        this.wrapper = React.createRef();
        this.closeList()

    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.reset) this.resetState()
        if(nextProps.value) this.setValue(nextProps.value);
    }

    setValue = value =>{
        this.setState({
            currentElements : [value]
        })
    }

    resetState = () =>{
        this.setState({currentElements: []});
        [...this.wrapper.current.querySelectorAll(`.${classes.select__item}`)].map( item => item.classList.remove(classes.checked));
    }

    closeList = () =>{

        document.addEventListener("click", e=>{
            if ( !e.target.closest(".select__container")){
                this.closeAllLists();
            }
        })
    }

    closeAllLists = (notThis)=>{
        const lists = [...document.querySelectorAll(".select__container")];
        lists.map( list =>{
            if (notThis){

                if ( !list.isEqualNode(notThis)) {
                    list.classList.remove(classes.isActive);
                }

            }else{
                list.classList.remove(classes.isActive);
            }
            return false;

        })
    }

    openListHandle = (e) =>{
        e.preventDefault();
        let target;
        if (e.target.classList.contains(classes.output)) {
            target = e.currentTarget;
            this.closeAllLists(target);
            target.classList.toggle(classes.isActive);
        }else{
            target = e.currentTarget.closest(`.${classes.container}`);
            this.closeAllLists(target);
            target.classList.add(classes.isActive);
        }




    }
    searchInputHandle = e =>{
        const searchValue = e.target.value;
        const list = [...this.wrapper.current.querySelectorAll(`.${classes.select__item}:not(.add__new)`)];

        list.map( item =>{
            if (item.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
                item.style.display = "block"
            }else{
                item.style.display = "none";
            }

            return false;
        })

    }
    itemClickHandler = e =>{
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget;
        const siblings = getAllSiblings(target, target.parentElement);

        target.classList.toggle(classes.checked)
        if (!this.props.multiselect ) {

            if (target.classList.contains(classes.checked)) {
                this.closeAllLists();
            }
            siblings.map(item => item.classList.remove(classes.checked))
        }

        this.setOutputValue(target)
    }

    setOutputValue = target =>{
        const value = target.textContent;

        let valueList = this.state.currentElements;

        if(this.props.multiselect){
            if(valueList.indexOf(value) !== -1){
                valueList.splice(valueList.indexOf(value), 1)
            }else{
                valueList.push(value)
            }

        }else{
            if(valueList.indexOf(value) !== -1){
                valueList = [];
            }else{
                valueList.splice(0, valueList.length);
                valueList.push(value);
            }

        }

        this.setState({
            ...this.state,
            currentElements: valueList
        })

        this.props.onChange(this.state.currentElements);
    }

    render(){

        const createList = data =>{
            let list;

            if(data && data.length > 0){
                list = data.map( (item, i) =>
                     (<li key={i} className={classes.select__item} onClick={e=>this.itemClickHandler(e)} >{item}</li>)

                )
            }
            return list;
        }

        const createOutputElements = () =>{
            const wrapper = this.wrapper.current ? this.wrapper.current.querySelector(`.${classes.container}`) : null;
            if(this.state.currentElements.length > 0 ){
                if (wrapper) wrapper.classList.add("isNotEmpty");
                if (wrapper) wrapper.querySelector(".select__placeholder").style.display = "none";
                return this.state.currentElements.map( (item, i) => (<span className="selected__item" key={i}>{item}</span>))

            }else{
                if (wrapper) wrapper.classList.remove("isNotEmpty");
                if (wrapper) wrapper.querySelector(".select__placeholder").style.display = "flex";
            }
        }

        return(
            <div className={classes.wrapper} ref={this.wrapper}>
                <div className={[classes.container, "select__container"].join(" ")} onClick={ e => this.openListHandle(e)}>
                    <div className="select__placeholder">{this.props.placeholder}</div>
                    <div className={classes.output}>
                        {createOutputElements()}
                    </div>
                    <div className={classes.list__wrapper}>
                        {this.props.autocomplete?
                         <input placeholder="Szukaj..." className={classes.search__input} onChange={ e => this.searchInputHandle(e)} onFocus={e => this.openListHandle(e)}/> :
                         null}

                        <ul>
                            {createList(this.props.data)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export  default Select;


