import React, { Component } from "react";
import ReactTooltip from 'react-tooltip'

import classes from "./MyChart.module.scss";


/*
DOC:
barData:{
    barName: string[]
    barVal: number[]
    style: ["perecnt"|| null]

}

maxValue:number
gradient:boolean

*/

class MyChart extends Component {

    barRender = (data) =>{
        const maxValue = this.props.maxValue;

        return data.map( (item, index) => {

            return item.barVal.map( (value, key) => {
                if(item.style = "percent"){
                    let percVal = ((value * 100) / maxValue).toFixed(1);
                    let gradient;

                    if(this.props.gradient){
                        if(percVal <= 40){
                            gradient = `linear-gradient(to right, rgba(138,219,92,0) 0%,rgba(133,255,63,1) 100%)`;
                        }else if(percVal > 40 && percVal < 70 ){
                            gradient = `linear-gradient(to right, rgba(133,255,63,0.6) 0%,rgba(239, 234, 98, .8) 53%,rgba(239, 234, 98, 1) 79%)`;
                        }else{
                            gradient = `linear-gradient(to right, rgba(133,255,63,0.3) 0%,rgba(239, 234, 98, 0.8) 53%,rgba(239, 234, 98, 0.8) 53%,rgba(255, 40, 40, 1) 100%)`;
                        }
                    }

                    if(this.props.stacked){
                        return <div className={classes.bar__wrapper} key={key}>
                                <div className={[classes.bar, classes.bar__stacked].join(" ")} data-tip={`${value} -${this.props.tooltip[key]}`} style={{width: `${percVal}%`, background: gradient}}></div>
                            </div>
                    }else{
                        return <div className={classes.bar__wrapper} key={key}>
                                <div className={classes.bar} data-tip={`${value}/${maxValue}`} style={{width: `${percVal}%`, background: gradient}}></div>
                            </div>
                    }


                }
            })

        })


    }
    axisXRender = (data) => {
        return <div className="axisX__wrapper">
        </div>
    }

    axisYRender = (data) => {
        return <div className="axisY__wrapper">
        </div>
    }


    render(){
        return(
            <div className={[classes.wrapper, "char__wrapper"].join(" ")}>
                { this.props.axisX && this.axisXRender() }

                { this.props.axisY && this.axisYRender() }

                <div className="background__wrapper">
                </div>
                <div className={[classes.bars__wrapper, classes.bars__wrapper__horizontal].join(" ")}>
                    {this.barRender(this.props.barData)}
                </div>
                <ReactTooltip />
            </div>
        )
    }

}

export default MyChart;