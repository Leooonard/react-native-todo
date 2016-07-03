import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text,
	TouchableWithoutFeedback
} from 'react-native';

import ProperDate from './CalendarGenerator/ProperDate';

export default class DayCell extends Component {
	static propTypes = {
		dayModel: PropTypes.object
	};

	static defaultProps = {
		dayModel: {}
	};

	constructor() {
		super();

		this.DAY_TYPE_CLASSNAME = {
			[ProperDate.Types.empty]: 'emptyDate',
			[ProperDate.Types.normal]: 'normalDate',
			[ProperDate.Types.today]: 'todayDate'
		};
	}

	render() {
		let {
			type,
			date
		} = this.props.dayModel;
		let className = this.DAY_TYPE_CLASSNAME[type];

		return (
			<TouchableWithoutFeedback>
				<View style = {{
					padding: 8,
					backgroundColor: 'white',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1
				}}>
					<Text style = {{
						color: 'blue'
					}}>{date.day}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
};