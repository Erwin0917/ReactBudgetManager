import React, { Component } from "react";
import classes from "../Dashbord.module.scss";


import MyChart from "../../../components/MyChart/MyChart";


class Realization extends Component {

    state ={
        incomes: null,
        expenses: null,
        period: "month"
    }

    constructor(props){
        super(props);

        this.date = new Date();
        this.year =  this.date.getFullYear();
		this.month =  this.date.getUTCMonth() + 1;
		this.day =  this.date.getUTCDate();
    }

    componentWillReceiveProps(nextProps){

        this.setSum(nextProps.data.incomes, nextProps.data.expenses);

    }

    setSum = (incomes, expenses) => {
        if( !incomes || !expenses) return;
        let incomesSum = 0;
        let expensesSum = 0;

        Object.keys(incomes).map( val =>{
            incomesSum = incomesSum + parseInt(incomes[val].price);
            return val;
        })

        let currentExpense = this.state.period === "month" ? expenses[this.year][this.month] : {};
        Object.keys(currentExpense).map( day =>{

            Object.keys(currentExpense[day]).map( inDay => {
                expensesSum = expensesSum + parseInt(currentExpense[day][inDay].price);

                return inDay;
            })
            return day;
        })


        this.setState({
            ...this.state,
            incomes: incomesSum,
            expenses: expensesSum
        })

    }

    renderSum = (arr, className) =>{
        let sum=0;

        if(Array.isArray(arr)){ // dla planowanych
                arr.map( val =>{
                    sum = sum + parseInt(val[1]);
                    return val;
                })
        }else{
               sum = arr;
        }


        return <div className={[classes.section__value, className].join(" ")} >{sum} PLN</div>
    }

    renderRest = (data)=>{
        let rest = 0;


        Object.keys(data.incomes).map( val =>{
            rest = rest + parseInt(data.incomes[val].price);
            return val;
        })
        Object.keys(data.expenses).map( val =>{
            rest = rest - parseInt(data.expenses[val].price);
            return val;
        })

        return <div className={classes.rest__val}>{rest} PLN</div>
    }


    renderCategoryCharts = (data) =>{

        const thisMonthExpenses = data.expenses[this.year][this.month];
        let usedCategory = [];
        let maxValue = 0;
        let allExpensesCategories = data.allCat;

        /* Obliczanie maksymalnej wartości dla wykresu */

        allExpensesCategories.map( (categoryWrapper, index) => {
            const categoryName = categoryWrapper.cat;
            const categoryTagsList = categoryWrapper.sub;

            let plannedValue = 0;
            let currentValue = 0;
            let lastMonthValue; /* TODO: niewiadomo czy będzie */

            maxValue = parseInt(plannedValue)  > maxValue ? parseInt(plannedValue) : maxValue;
            maxValue = parseInt(currentValue)  > maxValue ? parseInt(currentValue) : maxValue;

            categoryTagsList.map( (tag, tagIndex) => {
                    const currentTagName = tag;
                    let currentTagPlannedValue = 0;
                    let currentTagCurrentValue = 0;


                    data.planned.expenses.map( (plannedCategory) => {
                            const plannedCategoryName = plannedCategory[0];
                            const plannedCategoryValue = plannedCategory[1];

                            if(currentTagName === plannedCategoryName){
                                    currentTagPlannedValue += parseInt(plannedCategoryValue);
                            }
                    });

                    Object.keys(thisMonthExpenses).map( (day) => {
                            Object.keys(thisMonthExpenses[day]).map( inDay =>{
                                    const tagExpenseName = thisMonthExpenses[day][inDay].tags;
                                    const tagExpenseValue = thisMonthExpenses[day][inDay].price;

                                    if(currentTagName === tagExpenseName[0]){
                                        currentTagCurrentValue += parseInt(tagExpenseValue);
                                    }
                            });
                    })

                    plannedValue += currentTagPlannedValue;
                    currentValue += currentTagCurrentValue;

                    return tag;
            })

            return categoryWrapper;

    })


        /* Renderowanie elementów */
        return allExpensesCategories.map( (categoryWrapper, index) => {
                const categoryName = categoryWrapper.cat;
                const categoryTagsList = categoryWrapper.sub;

                let plannedValue = 0;
                let currentValue = 0;
                let lastMonthValue;/* TODO: niewiadomo czy będzie */

                const tagsWrapper = categoryTagsList.map( (tag, tagIndex) => {
                        const currentTagName = tag;
                        let currentTagPlannedValue = 0;
                        let currentTagCurrentValue = 0;

                        data.planned.expenses.map( (plannedCategory) => {
                                const plannedCategoryName = plannedCategory[0];
                                const plannedCategoryValue = plannedCategory[1];

                                if(currentTagName === plannedCategoryName){
                                        currentTagPlannedValue += parseInt(plannedCategoryValue);
                                }
                        });

                        Object.keys(thisMonthExpenses).map( (day) => {
                                Object.keys(thisMonthExpenses[day]).map( inDay =>{
                                        const tagExpenseName = thisMonthExpenses[day][inDay].tags;
                                        const tagExpenseValue = thisMonthExpenses[day][inDay].price;

                                        if(currentTagName === tagExpenseName[0]){
                                            currentTagCurrentValue += parseInt(tagExpenseValue);
                                        }
                                });
                        })

                        plannedValue += currentTagPlannedValue;
                        currentValue += currentTagCurrentValue;

                        return (
                            <div className={classes.tags__wrapper} key={tagIndex} >
                                <div>{currentTagName}</div>
                                <div>Planowane: {currentTagPlannedValue}</div>
                                <div>Rzeczywiste: {currentTagCurrentValue}</div>
                            </div>
                        )
                })

                return (
                    <div key={index} className={classes.category__realization}>
                        <div className={classes.category__wrapper}>
                            <div className={classes.category__title}>{categoryName}</div>
                            <MyChart barData={[{"barName":[null, null],"barVal": [plannedValue, currentValue], "style":["percent", "percent"]}]} maxValue={maxValue} tooltip={["planowane", "rzeczywiste"]} stacked/>
                            {tagsWrapper}
                        </div>
                    </div>
                )


        })

    }

    render(){

        return (
            <div className={[classes.module__wrapper, "block__wrapper"].join(" ")}>
                <div className={[classes.plan__wrapper, "block block_1-2"].join(" ")}>
                    <h2 className="block__title">Twój budżet - w tym miesiącu</h2>
                    <div className={classes.section__item}>
                        <h3 >Planowany przychód: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.props.data.planned.incomes, "col-incomes"):
                        <div>...</div>

                    }
                    </div>
                    <div className={classes.section__item}>
                        <h3 >Planowane wydatki: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.props.data.planned.expenses, "col-expenses")
                         :
                        <div>...</div>
                    }
                    </div>
                    <div className={classes.section__item} >
                        <h3 >Rzeczywiste przychody: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.state.incomes, "col-incomes")
                         :
                        <div>...</div>
                    }
                    </div>
                    <div className={classes.section__item} >
                        <h3 >Rzeczywiste wydatki: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.state.expenses, "col-expenses")
                         :
                        <div>...</div>
                    }
                    </div>
                    <div className={classes.section__item__full} >
                        <MyChart barData={[{"barName":[null],"barVal": [this.state.expenses], "style":["percent"]}]} gradient maxValue={this.state.incomes} />
                    </div>
                </div>
                <div className={[classes.plan__wrapper, "block block_1-2"].join(" ")}>
                    <h2 className="block__title">Twój budżet</h2>
                    <div className={classes.section__item__full}>
                        <h3>Do wydania pozostało:</h3>
                        {
                        this.props.data ?
                            this.renderRest(this.props.data)
                         :
                        <div>...</div>
                    }
                    </div>
                    <div className={classes.section__item__full}>
                        Portfel: <div className={classes.rest__val}>in progress...</div>
                    </div>

                </div>

                <div className={[classes.category__realization, "block block_1-2"].join(" ")}>
                    <h2 className="block__title">Stopień realizacji budżetu w kategoriach</h2>
                    <div className={classes.section__item__full}>

                    {  this.props.data && this.renderCategoryCharts(this.props.data) }

                    </div>


                </div>


            </div>
        )
    }


}

export default Realization;