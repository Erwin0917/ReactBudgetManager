import React,{ Component  } from "react";

import classes from "./Planning.module.scss"

import IncomesPlan from "./IncomesPlan/IncomesPlan";
import ExpensesPlan from "./ExpensesPlan/ExpensesPlan";

class Planning extends Component {

    render(){
        return(
            <div className=''>
                <div className="content__header">
                    <h1 className="content__header-title">Planowanie</h1>
                </div>
                <div className="content__container">
                    <div className={[classes.table__container, "block__wrapper"].join(" ")}>
                        <div className="block block_1-2">
                            <ExpensesPlan/>
                        </div>
                        <div className="block block_1-2">
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