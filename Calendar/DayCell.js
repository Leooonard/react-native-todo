import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet
} from 'react-native';

import ProperDate from './CalendarGenerator/ProperDate';

export default class DayCell extends Component {
	static propTypes = {
		dayModel: PropTypes.object,
		onDayClick: PropTypes.func,
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

	onClick () {
		this.props.onDayClick && this.props.onDayClick(this.props.dayModel);
	}

	render() {
		let {
			type,
			date
		} = this.props.dayModel;
		let className = this.DAY_TYPE_CLASSNAME[type];

		return (
			<TouchableWithoutFeedback
				onPress = {this.onClick.bind(this)}
			>
				<View style = {styles.cellWrapper}>
					<Text style = {styles.cell}>{date.day}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
};

let styles = StyleSheet.create({
	cellWrapper: {
		padding: 8,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	cell: {
		color: 'blue'
	}
});