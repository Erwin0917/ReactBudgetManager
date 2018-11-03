import React, { Component } from "react";

import classes from "./HistoryTable.module.scss";

import HistoryTableHeader from "./HistoryTableHeader/HistoryTableHeader";
import HistoryTableItem from "./HistoryTableItem/HistoryTableItem"

class HistoryTable extends Component {

    state = {
        expenses: null
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.data){
            const date = new Date();
            const year =  date.getFullYear();
            const month =  date.getUTCMonth() + 1;

            this.setState({
                ...this.state,
                expenses: nextProps.data.expenses[year][month]
            })
        }
    }

    buildContent = (expenses) => {
        const date = new Date();
        const year =  date.getFullYear();
        let month =  date.getUTCMonth() + 1;

        let day;


        return Object.keys(expenses).map( (day, index)=>{
            if( !day ) return;
            let summaryExpenses= 0;
            let dayHistory= [];
            let itemId= [];
            day = Object.keys(expenses)[index];
            Object.keys(expenses[day]).map( inDay => {
                summaryExpenses += parseInt(expenses[day][inDay].price)
                dayHistory.push(expenses[day][inDay]);
                itemId.push(inDay)

                return inDay;
             })

            day = Object.keys(expenses)[index] < 10 ? `0${Object.keys(expenses)[index]}` : Object.keys(expenses)[index];
            month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1 ;
            return <HistoryTableItem key={index}
                        day={[day, month, year]}
                        summaryExpenses={summaryExpenses}
                        dayHistory={dayHistory}
                        itemId={itemId}
                    />
        })

    }

    render(){
        return (
            <div className={["block", classes.wrapper].join(" ")}>
                <HistoryTableHeader>
                    <input type="text" placeholder="Szukaj"/>
                    <div className="button__switch__wrapper">
                        <button>Miesiąc</button>
                        <button>Tydzień</button>
                    </div>
                </HistoryTableHeader>
                <div className={classes.content__wrapper}>
                    {this.state.expenses && this.buildContent(this.state.expenses)}
                </div>

            </div>

        )
    }
}

export default HistoryTable;