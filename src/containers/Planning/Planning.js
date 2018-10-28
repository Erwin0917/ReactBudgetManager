import React,{ Component  } from "react";

import classes from "./Planning.module.scss"

import IncomesPlan from "./IncomesPlan/IncomesPlan";
import ExpensesPlan from "./ExpensesPlan/ExpensesPlan";
import { join } from "path";

class Planning extends Component {

    render(){
        return(
            <div className=''>
                <div className="content__header">
                    <h1 className="content__header-title">Planowanie</h1>
                    <h2 className="content__header-subTitle">Zaplanuj swoje przychody i wydatki. Kontroluj przepływ pieniędzy dzięki porównaniu planu do rzeczywistych wyników.</h2>
                </div>
                <div className="content__container">
                    <div className={[classes.table__container, "block__wrapper"].join(" ")}>
                        <div className="block block_1-3">
                            <ExpensesPlan/>
                        </div>
                        <div className="block block_1-3">
                            <IncomesPlan/>
                        </div>
                    </div>
                    Symulator oszczędności/Planowanie oszczędności<br/>
                </div>
            </div>
        )
    }

}

export default Planning;