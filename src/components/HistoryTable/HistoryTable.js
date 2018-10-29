import React, { Component } from "react";

import classes from "./HistoryTable.module.scss";


class HistoryTable extends Component {


    render(){
        return (
            <div className="HistoryTable__wrapper">
                <h2 className="block__title">Historia ostatnich wydatków</h2>
                <div>Miesiąc/tydzień</div>
                <div>Szukajka</div>
                <div>Data dzień / razem wydano </div>
                <div>Koszt / Kateogria / tag / edycja</div>

            </div>

        )
    }
}

export default HistoryTable;