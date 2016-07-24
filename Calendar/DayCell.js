import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text,
	TouchableOpacity,
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
			[ProperDate.Types.empty]: 'empty',
			[ProperDate.Types.normal]: 'cell',
			[ProperDate.Types.today]: 'today'
		};
	}

	onClick () {
		this.props.onDayClick && this.props.onDayClick(this.props.dayModel);
	}

	getStyle (type) {
		return {
			wrapper: this.DAY_TYPE_CLASSNAME[type] + 'Wrapper',
			cell: this.DAY_TYPE_CLASSNAME[type] + 'Cell'
		};
	}

	render() {
		let {
			type,
			date
		} = this.props.dayModel;
		let {wrapper: wrapperStyle, cell: cellStyle} = this.getStyle(type);

		return (
			<TouchableOpacity
				onPress = {this.onClick.bind(this)}
				style = {styles[wrapperStyle]}
			>
				<Text style = {styles[cellStyle]}>{date.day}</Text>
			</TouchableOpacity>
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
	cellCell: {
		color: 'blue'
	},
	todayWrapper: {
		padding: 8,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	todayCell: {
		color: 'red',
		fontSize: 16,
		fontWeight: 'bold'
	},
	emptyWrapper: {
		padding: 8,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	emptyCell: {
		color: 'white'
	}
});