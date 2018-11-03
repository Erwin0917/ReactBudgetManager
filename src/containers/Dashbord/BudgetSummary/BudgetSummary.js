import React,{ Component  } from "react";
import {ResponsiveContainer, ComposedChart, Area, XAxis, Tooltip} from "recharts";

import classes from "../Dashbord.module.scss";


class BudgetSummary extends Component {



    buildDataForChar = (nextProps) =>{
        const date = new Date();
        const year =  date.getFullYear();
        const data = [];
        const months = [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
        ]

        const wallet = nextProps.wallet.history[year];

        for(let i= 0; i < 12; i++){
            let value;
            let currentWallet;

            if( !wallet[i+1] ){
                value = 0;
                currentWallet = 0;
            }else{
                currentWallet = wallet[i+1].value;
                value = wallet[i+1].change;
            }

            data.push({
                "name": months[i],
                "Wynik": value,
                "Portfel": currentWallet
            })
        }

        return (
            <ResponsiveContainer  height={137}>
                <ComposedChart  data={data}
                    margin={{top: 0, right: -60, bottom: 0, left: -60}}>
                    <XAxis dataKey="name" hide={true}/>
                    <Tooltip />
                    <Area type='monotone' dataKey='Portfel' fill='#efefef' stroke='#0f0c29'/>
                </ComposedChart>
            </ResponsiveContainer>
        )

    }


    renderLastMonthStat = () =>{
        const date = new Date();
        const year =  date.getFullYear();
        const currentMonth = date.getUTCMonth() + 1;

        const value = this.props.data.wallet.history[year][currentMonth - 1].change;
        const style = value > 0 ? "col-incomes" : "col-expenses";

        return (<div className={[classes.section__value, style].join(" ")}>
                    {value} PLN
                </div>);
    }

    render(){


        return(
            <div className={["block", classes.summary__wrapper].join(" ")}>
                <h2 className="block__title">Podsumowanie budżetu</h2>
                <div className={classes.section__item}>
                    <h3>Portfel:</h3>
                    <div className={[classes.section__value, "col-anchor"].join(" ")}>
                        {this.props.data ? this.props.data.wallet.current.value : "..."} PLN
                    </div>
                </div>
                <div className={classes.section__item}>
                    <h3>Wynik z ostatniego miesiąca:</h3>
                    {this.props.data && this.renderLastMonthStat()}
                </div>
                <div className={classes.section__item}>
                {
                    this.props.data &&
                    this.buildDataForChar(this.props.data)
                }
                </div>
            </div>
        )
    }
}

export default BudgetSummary;