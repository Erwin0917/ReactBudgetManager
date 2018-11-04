import React, { Component } from 'react';
import firebase from '../../../firebase/config';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
	formatDate,
	parseDate,
  } from 'react-day-picker/moment';

import 'moment/locale/pl';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';

import '../../../components/Input/DayPicker.css';
import classes from './FastAdd.module.scss';

const database = firebase.database();


class FastAdd extends Component {
	state = {
        allExpensesCategories: [],
        allIncomesCategories:[],
        allExpensesTags: [],
		hierarchy: null,
		currentExpensesCategory: "",
		resetExpensesSelect: false,
		resetIncomesSelect: false
	};

	constructor(props){
		super(props);

		this.incomesDate = React.createRef();
		this.expensesDate = React.createRef();
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		const userId = firebase.auth().currentUser.uid;
		const ref = database.ref(`users/${userId}`);

		let snap;
        let allExpensesTags = [];
        let allIncomesCategories= [];
		let allExpensesCategories = [];

		ref.on(
			'value',
			snapshot => {
				snap = snapshot.val();
				if (snap.allExpensesCategories) {
					for (let item of snap.allExpensesCategories) {
						allExpensesCategories.push(item.cat)

                        item.sub.map( tag => {
							allExpensesTags.push(tag)
							return tag;
                        })
					}
                    for (let item of snap.allIncomesCategories) {
                        allIncomesCategories.push(item)
                    }
				}

                this.setState({
                    ...this.state,
                    allExpensesCategories: allExpensesCategories,
                    allExpensesTags: allExpensesTags,
                    hierarchy: snap,
                    allIncomesCategories: allIncomesCategories
                });
			},
			error =>{
				console.log('Error: ' + error.code);
			}
        );

	};

	submitDataHandler = type => {
        const userId = firebase.auth().currentUser.uid;

		let date;

		let data;
		let toReset;

        if (type === "expenses") {

			let isValid = this.validForm("expenses");

			if( !isValid ) return;
			date = this.expensesDate.current.state.value.split(".");
            data = {
                price: this.state.price ? this.state.price : "",
                name: this.state.desc ? this.state.desc : "",
                cat: this.state.currentCat ? this.state.currentCat : "",
                tags: this.state.currentTags ? this.state.currentTags : ""
			};

			toReset = "resetExpensesSelect";

			const wrapper = document.querySelector(`.${classes.expenses__wrapper}`);
			[...wrapper.querySelectorAll("input")].map( input => input.value = "");

        }else{
			let isValid = this.validForm("incomes");

			if( !isValid ) return;

			date = this.incomesDate.current.state.value.split(".");

            data = {
                price: this.state.price ? this.state.price : "",
                cat: this.state.currentCat ? this.state.currentCat : ""
			};

			toReset = "resetIncomesSelect";
			const wrapper = document.querySelector(`.${classes.earnings__wrapper}`);
			[...wrapper.querySelectorAll("input")].map( input => input.value = "");
		}

		let year = date[2];
		let month = date[1] < 10 ? date[1].split("")[1] : date[1];
		let day = date[0] < 10 ? date[0].split("")[1] : date[0];


		database
			.ref(`users/${userId}/${type}/${year}/${month}/${day}`)
			.push(data, function(error) {
				if (error) console.log(error);
            });
        this.setState({
            ...this.state,
            price: null,
            currentTags: null,
            currentCat: null,
			desc: null,
			[toReset]: true
		})

		setTimeout(() => {
			this.setState({
				...this.state,
				[toReset]: false
			})
		}, 200);


	};

	validForm = name => {
		let isValid = true;
		let wrapper;
		if(name === "expenses"){
			wrapper = document.querySelector(`.${classes.expenses__wrapper}`);
		}else{
			wrapper = document.querySelector(`.${classes.earnings__wrapper}`);
		}

		[...wrapper.querySelectorAll(`.${classes.input__amount}`)].map( input => {

			if(input.value.length === 0 ){
				console.log("input error");
				isValid = false;
				input.classList.add("error");
			}else{
				input.classList.remove("error");
			}
		});

		[...wrapper.querySelectorAll(".select__container")].map( selectWrapper => {
			const placeholder = selectWrapper.querySelector(".select__placeholder")

			if(placeholder.style.display === "flex"){
				selectWrapper.classList.add("error");
				console.log("select error");
				isValid = false;
			}else{
				selectWrapper.classList.remove("error");
			}
		});

		return isValid;
	}

    getPrice = e => {
        this.setState({
            ...this.state,
            price: e.target.value
        })
    }
    getTag = e =>{
		let currentCategory;
		const allExpensesCategories = this.state.hierarchy.allExpensesCategories;

		allExpensesCategories.map( elem => {
			const cat = elem.cat;
			elem.sub.map( sub => {
				if( e[0] === sub){
					currentCategory = cat;
				}
			})
		})

        this.setState({
            ...this.state,
			currentTags: e,
			currentExpensesCategory: currentCategory
        })
    }
    getCat = e => {
        this.setState({
            ...this.state,
            currentCat: e
        })
    }
    getDesc = e => {
        this.setState({
            ...this.state,
            desc: e.target.value
        })
    }

	render() {
		return (
			<div className={[classes.wrapper, "block"].join(" ")}>
				<h2 className="block__title">Szybkie dodawanie</h2>
				<div className={classes.earnings__wrapper}>
					<Input
						onChange={this.getPrice}
						placeholder="PLN"
						inputClass={classes.input__amount}
					/>
					<Select autocomplete placeholder="Żródło przychodu"  onChange={this.getCat} data={this.state.allIncomesCategories} reset={this.state.resetIncomesSelect}/>
					<DayPickerInput
						ref={this.incomesDate}
						className={"dayPicker__wrapper"}
						value={new Date()}
						formatDate={formatDate}
        				parseDate={parseDate}
						dayPickerProps={{
							locale: 'pl',
							localeUtils: MomentLocaleUtils,
						}}
					/>
					<Button
						text="Dodaj przychód"
						onClick={e => this.submitDataHandler('incomes')}
						className="col-bg-expenses"
					/>
				</div>
				<div className={classes.expenses__wrapper}>
					<Input placeholder="PLN" inputClass={classes.input__amount} onChange={this.getPrice} />

					<Select
						autocomplete
						placeholder="Tagi"
						data={this.state.allExpensesTags}
                        onChange={this.getTag}
						reset={this.state.resetExpensesSelect}
					/>
					<Select
						autocomplete
						placeholder="Kategoria"
						data={this.state.allExpensesCategories}
                        onChange={this.getCat}
						reset={this.state.resetExpensesSelect}
						value={this.state.currentExpensesCategory}
					/>
					<Input placeholder="Opis" onChange={this.getDesc} />
					<DayPickerInput
						ref={this.expensesDate}
						className={"dayPicker__wrapper"}
						value={new Date()}
						formatDate={formatDate}
        				parseDate={parseDate}
						dayPickerProps={{
							locale: 'pl',
							localeUtils: MomentLocaleUtils,
						}}
					/>
					<Button
						text="Dodaj wydatek"
						onClick={e => this.submitDataHandler('expenses')}
						className="col-bg-incomes"
					/>
				</div>

			</div>
		);
	}
}

export default FastAdd;

