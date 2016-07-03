import React, {
	Component,
	PropTypes
} from "react";

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import CalendarGenerator from "./CalendarGenerator";
import ProperDate from "./CalendarGenerator/ProperDate";

import MonthOperationBar from "./MonthOperationBar.js";
import WeekRow from "./WeekRow.js";

export default class Calendar extends Component {
	static propTypes = {
		month: PropTypes.number,
		year: PropTypes.number
	};

	static defaultProps = {
		month: (new ProperDate).month,
		year: (new ProperDate).year
	};

	constructor() {
		super();

		this.state = {
			year: undefined,
			month: undefined
		};

		this.gotoLastMonth = this.gotoLastMonth.bind(this);
		this.gotoNextMonth = this.gotoNextMonth.bind(this);
		this.gotoYearView = this.gotoYearView.bind(this);
	}

	componentWillMount() {
		this.setState({
			year: this.props.year,
			month: this.props.month
		});
	}

	renderWeeks() {
		let weekArray = this.generateWeeks();

		let weekView = weekArray.map((weekModel, index) => {
			return (
				<WeekRow 
					key = {`WeekRow${index}`} 
					weekModel = {weekModel} 
					dayCellClick = {this.props.click}
				/>
			);
		});

		return weekView;
	}

	gotoLastMonth() {
		let {
			year,
			month
		} = this.state;
		if (this.isGotoLastYear(month)) {
			this.setState({
				year: year - 1,
				month: 12
			});
		} else {
			this.setState({
				year,
				month: month - 1
			});
		}
	}

	gotoNextMonth() {
		let {
			year,
			month
		} = this.state;
		if (this.isGotoNextYear(month)) {
			this.setState({
				year: year + 1,
				month: 1
			});
		} else {
			this.setState({
				year,
				month: month + 1
			});
		}
	}

	isGotoLastYear(thisMonth) {
		if (thisMonth === 1) {
			return true;
		} else {
			return false;
		}
	}

	isGotoNextYear(thisMonth) {
		if (thisMonth === 12) {
			return true;
		} else {
			return false;
		}
	}

	gotoYearView() {

	}

	generateWeeks() {
		let {
			year,
			month
		} = this.state;
		let calendarModel = new CalendarGenerator(year, month);
		let weekArray = calendarModel.getWeekArray();

		return weekArray;
	}

	render() {
		return (
			<View className = {'calendar'}>
				<MonthOperationBar 
					year = {this.state.year}
					month = {this.state.month}
					gotoLastMonth = {this.gotoLastMonth} 
					gotoNextMonth = {this.gotoNextMonth}
					gotoYearView = {this.gotoYearView}
				/>
				<View style = {{flexDirection: 'row'}}>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周日</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周一</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周二</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周三</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周四</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周五</Text>
					</View>
					<View style = {styles.dayCellWrapper}>
						<Text style = {{color: 'blue'}}>周六</Text>
					</View>
				</View>
				{
					this.renderWeeks()
				}
			</View>
		);
	}
};

let styles = StyleSheet.create({
	dayCellWrapper: {
		padding: 8,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
});