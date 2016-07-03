import React, {
	Component,
	PropTypes
} from 'react';

import {
	View
} from 'react-native';

import DayCell from './DayCell';

export default class WeekRow extends Component {
	static propTypes = {
		weekModel: PropTypes.array,
		onDayClick: PropTypes.func,
	};

	static defaultProps = {
		weekModel: []
	};

	constructor() {
		super();
	}

	renderDays() {
		let dayArray = this.props.weekModel;

		return dayArray.map((day, index) => {
			return <DayCell 
						key = {`DayCell${index}`} 
						dayModel = {day} 
						onDayClick = {this.props.onDayClick}
					/>
		});
	}

	render() {
		return (
			<View style = {{
				flexDirection: 'row'
			}}>
				{this.renderDays()}
			</View>
		);
	}
};