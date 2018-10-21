import React, {Component} from "react";

import firebase from '../../../firebase/config';
import * as _ from "lodash";

import Table from "../../../components/Table/Table";

const database = firebase.database();

class ExpensesPlan extends Component{

    state = {
        combinedData: null
    }


    componentDidMount() {
        this.fetchData()
    }

    fetchData = () =>{
        const userId = firebase.auth().currentUser.uid;
        const fetchedData = database.ref(`users/${userId}`);

        fetchedData.on(
			'value',
			snapshot => {
                const snap = snapshot.val();
                this.combineData( snap.allCat, snap.planned.expenses)
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );


    }

    savePlan = data =>{
        /* const userId = firebase.auth().currentUser.uid;
        database.ref(`users/${userId}/planned/expenses/`).set(data); */

        console.log(data);

    }

    combineData = (all, planned) =>{

        let combineData = all.map( cat =>{

                planned.map( plannedItem =>{
                    const index = cat.sub.indexOf(plannedItem[0]);

                    if(index !== -1){
                        cat.sub[index] = [plannedItem]
                    }
                })

            return cat;
        })

        this.setState({
            ...this.state,
            combinedData: combineData
        })
    }

    render(){
        return (
            <Table
                tableTitle="Planowane wydatki"
                data={this.state.combinedData}
                onSave={this.savePlan}
             />
        )
    }
}

export default ExpensesPlan;