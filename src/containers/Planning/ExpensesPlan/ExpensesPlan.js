import React, {Component} from "react";

import firebase from '../../../firebase/config';

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
                this.combineData( snap.allExpensesCategories, snap.planned ? snap.planned.expenses : [])
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );


    }

    savePlan = data =>{
        const userId = firebase.auth().currentUser.uid;


        let newData= [];
        Object.keys(data).map( (key, i) =>{
            data[key].map( tag =>{
                if(tag[1]){
                    newData.push(tag)
                }
                return tag;
            })
            return key;

        })
        database.ref(`users/${userId}/planned/expenses/`).set(newData);

    }

    combineData = (all, planned) =>{

        let combineData = all.map( cat =>{

                planned.map( plannedItem =>{
                    const index = cat.sub.indexOf(plannedItem[0]);

                    if(index !== -1){
                        cat.sub[index] = [plannedItem]
                    }
                    return plannedItem;
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