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

        this.setSum(nextProps.data.incomes, nextProps.data.expenses, nextProps.data.planned.incomes);

    }

    setSum = (incomes, expenses, plannedIncomes) => {
        if( !incomes || !expenses) return;
        let incomesSum = 0;
        let expensesSum = 0;
        let plannedIncomesSum = 0;

        let currentIncomes = this.state.period === "month" ? incomes[this.year][this.month] : 0;
        if(currentIncomes){
            Object.keys(currentIncomes).map( day =>{
                Object.keys(currentIncomes[day]).map( inDay => {
                    incomesSum = incomesSum + parseInt(currentIncomes[day][inDay].price);

                    return inDay;
                })
                return day;
            })

        }

        let currentExpense = this.state.period === "month" ? expenses[this.year][this.month] : 0;
        if(currentExpense){
            Object.keys(currentExpense).map( day =>{

                Object.keys(currentExpense[day]).map( inDay => {
                    expensesSum = expensesSum + parseInt(currentExpense[day][inDay].price);

                    return inDay;
                })
                return day;
            })
        }

        plannedIncomes.map( item => plannedIncomesSum += parseInt(item[1]) )

        this.setState({
            ...this.state,
            incomes: incomesSum,
            plannedIncomes: plannedIncomesSum,
            expenses: expensesSum
        })

    }

    renderSum = (arr, className) =>{
        let sum=0;
        if(arr){
            if(Array.isArray(arr)){ // dla planowanych
                    arr.map( val =>{
                        sum = sum + parseInt(val[1]);
                        return val;
                    })
            }else{
                    sum = arr;
            }
        }


        return <div className={[classes.section__value, className].join(" ")} >{sum} PLN</div>
    }

    renderRest = (filter)=>{
        let rest = 0;

        if(filter === "current"){
            rest = this.state.incomes - this.state.expenses;
            if(!rest) rest = 0;
        }else{
            rest = this.state.plannedIncomes - this.state.expenses;
            if(!rest) rest = 0;
        }

        return <div className={[classes.section__value, "col-anchor"].join(" ")}>{rest} PLN</div>
    }


    renderCategoryCharts = (data) =>{

        const thisMonthExpenses = data.expenses[this.year][this.month];
        let maxValue = 0;
        let allExpensesCategories = data.allCat;

        /* Obliczanie maksymalnej wartości dla wykresu */

        /* FIXME: W obliczaniu wyciągnąć wartości do zmiennych, nie robić tego samego dla renderowania */
        allExpensesCategories.map( (categoryWrapper, index) => {
            const categoryTagsList = categoryWrapper.sub;

            let plannedValue = 0;
            let currentValue = 0;
            let lastMonthValue; /* TODO: niewiadomo czy będzie */

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

                            return plannedCategory;
                    });
                    if(thisMonthExpenses){
                        Object.keys(thisMonthExpenses).map( (day) => {
                                Object.keys(thisMonthExpenses[day]).map( inDay =>{
                                        const tagExpenseName = thisMonthExpenses[day][inDay].tags;
                                        const tagExpenseValue = thisMonthExpenses[day][inDay].price;

                                        if(currentTagName === tagExpenseName[0]){
                                            currentTagCurrentValue += parseInt(tagExpenseValue);
                                        }

                                        return inDay;
                                });
                            return day;
                        })
                    }

                    plannedValue += currentTagPlannedValue;
                    currentValue += currentTagCurrentValue;

                    maxValue = parseInt(plannedValue)  > maxValue ? parseInt(plannedValue) : maxValue;
                    maxValue = parseInt(currentValue)  > maxValue ? parseInt(currentValue) : maxValue;

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
                            return plannedCategory;
                        });
                        if(thisMonthExpenses){
                            Object.keys(thisMonthExpenses).map( (day) => {
                                    Object.keys(thisMonthExpenses[day]).map( inDay =>{
                                            const tagExpenseName = thisMonthExpenses[day][inDay].tags;
                                            const tagExpenseValue = thisMonthExpenses[day][inDay].price;

                                            if(currentTagName === tagExpenseName[0]){
                                                currentTagCurrentValue += parseInt(tagExpenseValue);
                                            }

                                            return inDay;
                                    });
                                return day;
                            })
                        }

                        plannedValue += currentTagPlannedValue;
                        currentValue += currentTagCurrentValue;

                        if( currentTagPlannedValue + currentTagCurrentValue > 0){
                            return (
                                <div className={classes.tag} key={tagIndex} >

                                    <MyChart barData={[{"barName":[null, null],"barVal": [currentTagPlannedValue, currentTagCurrentValue], "style":["percent", "percent"], "color": ["rgb(221, 201, 239)", "#4c0cc4"]}]}     maxValue={maxValue} tooltip={["planowane", "rzeczywiste"] } stacked slim/>

                                    <div className={classes.tag__title}>{currentTagName}</div>
                                    <div className={classes.char__info}>Wydane: <span className="col-expenses">{currentTagCurrentValue}</span></div>
                                </div>
                            )
                        }else{
                            return null;
                        }


                })

                if(plannedValue + currentValue > 0){
                    return (
                        <div className={classes.category__wrapper} key={index}>

                            <MyChart barData={[{"barName":[null, null],"barVal": [plannedValue, currentValue], "style":["percent", "percent"], "color": ["rgb(236, 229, 243)", "#4c0cc4"]}]} maxValue={maxValue} tooltip={["planowane", "rzeczywiste"]} stacked slim/>

                            <div className={classes.category__title} onClick={ e => this.openTagsList(e)}>{categoryName}<span className="ico ico-arrow"></span></div>
                            <div className={classes.char__info}>Wydane: <span className="col-expenses">{currentValue}</span></div>

                            <div className={classes.tags__wrapper}>
                                {tagsWrapper}
                            </div>
                        </div>
                    )
                }else{
                    return null;
                }




        })

    }


    openTagsList = e =>{
        const target = e.currentTarget;
        const arrow = target.querySelector(".ico-arrow");
        const categoryWrapper = target.closest(`.${classes.category__wrapper}`);
        const categoryWrapperheight = categoryWrapper.offsetHeight;
        const tagsWrapper = categoryWrapper.querySelector(`.${classes.tags__wrapper}`);
        const tagsWrapperHeight = tagsWrapper.offsetHeight;



        if(target.classList.contains("is-active") ){
            categoryWrapper.style.height = `${categoryWrapperheight - tagsWrapperHeight}px`;
        }else{
            categoryWrapper.style.height = `${categoryWrapperheight + tagsWrapperHeight}px`;
        }

        target.classList.toggle("is-active")
        arrow.classList.toggle("is-active");


    }

    render(){

        return (
            <div className={[classes.module__wrapper, "block__wrapper block block_1-2"].join(" ")}>
                <div className={[classes.plan__wrapper, "block"].join(" ")}>
                    <h2 className="block__title">Twój budżet</h2>
                    <div className={classes.section__item}>
                        <h3 >Planowany przychód: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.props.data.planned.incomes, "col-incomes"):
                        <div>...</div>

                    }
                    <h3 >Rzeczywisty przychód: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.state.incomes, "col-incomes")
                        :
                        <div>...</div>
                    }
                    </div>

                    <div className={classes.section__item} >
                    <h3 >Planowane wydatki: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.props.data.planned.expenses, "col-expenses")
                        :
                        <div>...</div>
                    }

                    <h3 >Rzeczywiste wydatki: </h3>
                    {
                        this.props.data ?
                            this.renderSum(this.state.expenses, "col-expenses")
                        :
                        <div>...</div>
                    }
                    </div>

                    <div className={classes.section__item}>
                        <h3>Pozostało według planu:</h3>
                        <div className={[classes.section__value, "col-anchor"].join(" ")}>
                            {
                            this.props.data ?
                                this.renderRest("planned")
                            :
                            <div>...</div>
                            }
                        </div>
                        <h3>Do wydania pozostało:</h3>
                        {
                        this.props.data ?
                            this.renderRest("current")
                        :
                        <div>...</div>
                        }

                    </div>

                    <div className={classes.section__item__full} >
                        <MyChart barData={[{"barName":[null],"barVal": [this.state.expenses], "style":["percent"]}]} gradient maxValue={this.state.incomes} />
                    </div>
                </div>

                <div className={[classes.category__realization, "block "].join(" ")}>
                    <h2 className="block__title">Stopień realizacji budżetu w kategoriach</h2>
                    <div className="legend__wrapper"><div className="legend__item">Rzeczywiste</div><div className="legend__item">Planowane</div><div className="legend__item">Ostatni miesiąc</div></div>
                    <div className={classes.section__item__full}>

                    {  this.props.data && this.renderCategoryCharts(this.props.data) }

                    </div>


                </div>
            </div>
        )
    }


}

export default Realization;