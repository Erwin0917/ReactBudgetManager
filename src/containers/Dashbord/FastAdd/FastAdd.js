import React,{ Component  } from "react";
import firebase from "../../../firebase/config";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Select from "../../../components/Select/Select";


import classes from "./FastAdd.module.scss";

const database = firebase.database();

class FastAdd extends Component{
    state={
        cats:[],
        tegs:[]
    }
    constructor(props){
        super(props);

    }

    componentDidMount() {
        this.fetchData();
    }


    changeHandler = e =>{

    }

    fetchData = (url)=>{
        let tags = ["alkohol", "spożywcze", "suplementy", "jedzenie miasto", "jedzenie dom", "jedzenie praca", "Czynsz", "Prąd", "Paliwo do auta", "Bilet"];

        let cats = ["jedzenie", "Mieszkanie", "Transport", "Sport", "Ubrania", "Higiena", "rozrywka"];

        this.setState({
            ...this.state,
            cats:cats,
            tags: tags
        })
    }

    writeDataHandler = ()=>{
        const userId = firebase.auth().currentUser.uid;

              firebase.database().ref(`users/${userId}`).set({
                   info:{
                       email: firebase.auth().currentUser.email

                   } ,
                   earns:[
                        {
                           price: 10,
                           name: "DEMO",
                           cat: ["Kategoria 1"],
                           tags: ["tag1", "tag2", "tag3"],
                           date: "12-11-2018"
                        }
                   ]
                   ,
                   expenses:[]

              }, function (error) {
                  if (error) {
                     console.log(error);
                  } else {
                      console.log("dane zapisane");
                  }
              })
    }


    render(){
        return(
            <div className={classes.wrapper}>
                <div className={classes.expenses__wrapper}>
                    <Input
                        onChange={this.changeHandler}
                        placeholder="PLN"
                        inputClass = {classes.input__amount} / >

                    <Select
                        autocomplete
                        placeholder="Tagi"
                        data={this.state.tags}
                        addNew
                        multiselect
                    />
                    <Select
                        autocomplete
                        placeholder="Kategoria"
                        data={this.state.cats}
                        addNew
                    />
                    <Input
                        onChange={this.changeHandler}
                        placeholder="Na co znowu poszlo..."/>
                    <Button text="Dodaj" onClick={this.writeDataHandler}/>
                </div>
                <div className={classes.earnings__wrapper}>
                    <Input
                        onChange={this.changeHandler}
                        placeholder="PLN"
                        inputClass = {classes.input__amount} / >
                    <Select
                        autocomplete
                        placeholder="Żródło przychodu"

                        addNew
                    />
                    <Button text="Dodaj"/>
                </div>
            </div>
        )
    }
}

export default FastAdd;

/* TODO:
- DODAJ WYDATEK
- WPISZ TAG - Kategoria automatycznie dostosowana
- DODAJ PRZYCHÓD

*/