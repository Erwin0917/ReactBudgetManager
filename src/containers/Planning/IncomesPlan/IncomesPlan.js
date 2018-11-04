import React, {Component} from "react"

import firebase from '../../../firebase/config';

import Table from "../../../components/Table/Table";

const database = firebase.database();

class IncomesPlan extends Component{

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
                this.combineData( snap.allIncomesCategories, snap.planned ? snap.planned.incomes : [])
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );
    }

    combineData = (all, planned) =>{

        let combineData = all.map( cat =>{
            if(planned){
                planned.map( plannedItem =>{
                    const index = cat.indexOf(plannedItem[0]);

                    if(index !== -1){
                        cat = [plannedItem]
                    }

                    return plannedItem;
                })
            }

            return cat;
        })

        this.setState({
            ...this.state,
            combinedData: combineData
        })
    }

    savePlan = data =>{
        const userId = firebase.auth().currentUser.uid;

        let newData= [];
        data.map( (key, i) =>{
            console.log(key);
            console.log(Object.keys(key)[0]);
            if(key[Object.keys(key)[0]]){
                newData.push([Object.keys(key)[0], key[Object.keys(key)[0]]])
            }

            return key;
        })
        database.ref(`users/${userId}/planned/incomes/`).set(newData);
    }


    render(){
        return (
           <Table
               tableTitle="Planowane przychody"
               data={this.state.combinedData}
               onSave={this.savePlan}
           />
        )
    }
}

export default IncomesPlan;