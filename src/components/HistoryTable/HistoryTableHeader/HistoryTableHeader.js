import React from "react";

const HistoryTableHeader = (props) => {

    return(
        <div className="historyTable__header">
            <h2 className="block__title">Historia ostatnich wydatków</h2>
            <div className="filter__wrapper">
                {props.children}
            </div>

        </div>
    )
}

export default HistoryTableHeader;