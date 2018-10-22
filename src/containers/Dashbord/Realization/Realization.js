import React from "react";
import classes from "../Dashbord.module.scss";

function Realization(props){


    const renderSum = (arr, className) =>{
        let incomesSum=0;
        arr.map( income =>{
            incomesSum = incomesSum + parseInt(income[1]);
            return income;
        })

        return <div className={[classes.section__value, className].join(" ")}>{incomesSum} PLN</div>
    }



    return (
        <div className={classes.module__wrapper}>
            <div className={classes.plan__wrapper}>
                <div className={classes.section__title__wrapper}>
                    <h2 className={classes.section__title}>Plan budżetu</h2>
                </div>
                <div className={classes.section__item}>
                    <h3 >Planowany przychód: </h3>
                {
                    props.data ?
                        renderSum(props.data.planned.incomes, "col-incomes"):
                    <div>Wczytuje dane</div>

                }
                </div>
                <div className={classes.section__item}>
                    <h3 >Planowane wydatki: </h3>
                {
                    props.data ?
                        renderSum(props.data.planned.expenses, "col-expenses")
                     :
                    <div>Wczytuje dane</div>
                }
                </div>
            </div>
            <div className={classes.realization__wrapper}>
                <h2 className={classes.section__title}>Rzeczywista realizacja</h2>

                Rzeczywiste przychody:
                Rzeczywiste wydatki:
                Do końca miesiąca pozostało:
            </div>
            <div>
                Wykres procent wydanego przychodu
            </div>
        </div>
    )

}

export default Realization;