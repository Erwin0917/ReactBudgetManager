import React,{ Component  } from "react";

import classes from "../Dashbord.module.scss";

class BudgetSummary extends Component {

    render(){
        return(
            <div className={["block", classes.summary__wrapper].join(" ")}>
                <h2 className="block__title">Podsumowanie budżetu:</h2>
                <div className={classes.section__item}>
                    <h3>Portfel</h3>
                    <div className={[classes.section__value, "col-anchor"].join(" ")}>
                        3800 PLN
                    </div>
                </div>
                <div className={classes.section__item}>
                    <h3>Wynik z ostatniego miesiąca:</h3>
                    <div className={[classes.section__value, "col-incomes"].join(" ")}>
                        +200 PLN
                    </div>
                </div>
                <div className={classes.section__item}>
                    <h3>Ostatnie miesiące:</h3>
                    wykres 12mc
                </div>
            </div>
        )
    }
}

export default BudgetSummary;