import React, { Component } from 'react';

import firebase from "../../firebase/config";


import FastAdd from "./FastAdd/FastAdd";
import Realization from "./Realization/Realization";

import classes from "./Dashbord.module.scss";

const database = firebase.database();

class Dashbord extends Component {

    state = {
        data:null
    }

    /* constructor(props){
        super(props);
    } */
    componentDidMount = ()=>{
        const userId = firebase.auth().currentUser.uid;
        const fetchedData = database.ref(`users/${userId}`);

        fetchedData.on(
			'value',
			snapshot => {
                const snap = snapshot.val();
                this.setState({
                    ...this.state,
                    data: {
                        expenses: snap.expenses,
                        incomes: snap.incomes,
                        planned: snap.planned,
                        allCat: snap.allCat
                    }
                })
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );
    }

    render() {
    return (
     <div className=''>
        <div className={["content__header", classes.content__header].join(" ")}>
            <h1 className="content__header-title">DASHBOARD</h1>
            <FastAdd/>
        </div>
        <div>
            <Realization
                data={this.state.data}
            />

            Realizacja budzetu w kategoriach<br/>
            Ostatnie wydatki - możliwość edycji zeszly miesiac/tydzien button<br/>
        </div>
     </div>
        )
    }
}

export default Dashbord;