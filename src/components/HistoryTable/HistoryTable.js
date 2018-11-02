import React, { Component } from "react";

import classes from "./HistoryTable.module.scss";


class HistoryTable extends Component {


    render(){
        return (
            <div className="block HistoryTable__wrapper">
                <h2 className="block__title">Historia ostatnich wydatków</h2>
                <div className="filter__wrapper">
                    <input type="text" placeholder="Szukaj"/>
                    <div className="button__switch__wrapper">
                        <button>Miesiąc</button>
                        <button>Tydzień</button>
                    </div>
                </div>
                <div className="content__wrapper">
                    <div className="content__item">
                        <div className="item__header">
                            <h3 className="item__title">Dzień</h3>
                            <h3 className="item__summaryInfo">Wydane: 400 PLN</h3>
                        </div>
                        <div className="item__content">
                            <div>Koszt</div>
                            <div>Kategoria</div>
                            <div>Tag</div>
                            <button>Edytuj</button>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default HistoryTable;