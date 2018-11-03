import React from "react";

import classes from "../HistoryTable.module.scss";


const HistoryTableItem = (props) =>{

    const buildItemContent = (dayHistory, i) =>{
        const itemIdArr = props.itemId;

        return dayHistory.map( (inDay, index) => {
            return (
                <div className="item__content" key={index}>
                    <div className="item__content__val val--price" data-tip="Koszt">{inDay.price} PLN</div>
                    <div className="item__content__val val--tag" data-tip="Tag">{inDay.tags[0]}</div>
                    <div className="item__content__val val--category" data-tip="Kategoria">{inDay.cat[0]}</div>
                    { inDay.name && <div className="item__content__val val--desc" data-tip="Opis">{inDay.name}</div>}
                    <button itemID={itemIdArr[index]} style={{display: "none"}} data-tip="Edytuj">Edytuj</button>
                </div>
            )
        })
    }

    return (
        <div className={classes.content__item}>
            <div className="item__header">
                <h3 className="item__title">{props.day && props.day.join(".")}</h3>
                <h3 className="item__summaryInfo">Razem: <span className="col-expenses">{props.summaryExpenses && props.summaryExpenses} PLN</span></h3>
            </div>
            {props.dayHistory && buildItemContent(props.dayHistory)}

        </div>
    )
}

export default HistoryTableItem;