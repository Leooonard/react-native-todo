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
		weekModel: PropTypes.array
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
						dayCellClick = {this.props.dayCellClick}
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