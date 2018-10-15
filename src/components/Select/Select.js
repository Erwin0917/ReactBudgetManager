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


        })
    }

    openListHandle = (e) =>{
        e.preventDefault();
        let target;
        if (e.currentTarget.classList.contains(classes.container)){
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
        console.log(e.target.value);


    }
    itemClickHandler = e =>{
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget;
        const siblings = getAllSiblings(target, target.parentElement);

        target.classList.toggle(classes.checked)
        if (!this.props.multiselect ) {

            if (target.classList.contains(classes.checked)) {
                console.log("zamknij wszystkie item zaznaczony");
                this.closeAllLists();
            }
            siblings.map(item => item.classList.remove(classes.checked))
        }

        this.setOutputValue(target)
    }

    setOutputValue = target =>{
        const value = target.textContent;

        const valueList = [value]

        this.setState({
            ...this.state,
            currentElements: valueList
        })

    }

    render(){

        const createList = data =>{
            let list;

            if(data && data.length > 0){
                list = data.map( item =>
                     (<li key={item} className={classes.select__item} onClick={e=>this.itemClickHandler(e)} >{item}</li>)

                )
            }
            return list;
        }

        const outputElements = () =>{
            const wrapper = this.wrapper.current ? this.wrapper.current.querySelector(`.${classes.container}`) : null;
            console.log(this.wrapper.current);
            if(this.state.currentElements.length > 0 ){
                if (wrapper) wrapper.classList.add(classes.isNotEmpty);
                return this.state.currentElements.map( (item, i) => (<span key={i}>{item}</span>))

            }else{
                if (wrapper) wrapper.classList.remove(classes.isNotEmpty);
                return this.props.placeholder;
            }
        }

        return(
            <div className={classes.wrapper} ref={this.wrapper}>
                <div className={[classes.container, "select__container"].join(" ")} onClick={ e => this.openListHandle(e)}>
                    <div className={classes.output}>
                        {outputElements()}
                    </div>
                    <div className={classes.list__wrapper}>
                        {this.props.autocomplete?
                         <input placeholder="Szukaj..." className={classes.search__input} onChange={ e => this.searchInputHandle(e)} onFocus={e => this.openListHandle(e)}/> :
                         null}

                        <ul>
                            {this.props.addNew ?
                            <li className={[classes.select__item, "add__new"].join(" ")}><span className="ico ico-plus"></span>Dodaj nowy</li> :
                            null}
                            {createList(this.props.data)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export  default Select;


