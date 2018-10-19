import React, {Component} from "react";

import firebase from '../../../firebase/config';

import Table from "../../../components/Table/Table";

const database = firebase.database();

class ExpensesPlan extends Component{

    state = {
        data: null
    }


    componentDidMount() {
        this.fetchData()
    }

    fetchData = () =>{
        const userId = firebase.auth().currentUser.uid;
        const ref = database.ref(`users/${userId}/allCat`);

        ref.on(
			'value',
			snapshot => {
				const snap = snapshot.val();
                this.setState({
                    ...this.state,
                    data: snap
                });
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );
    }

    savePlan = data =>{
        console.log(data);
    }

    render(){
        return (
            <Table
                tableTitle="Planowane wydatki"
                data={this.state.data}
                onSave={this.savePlan}
             />
        )
    }
}

export default ExpensesPlan;