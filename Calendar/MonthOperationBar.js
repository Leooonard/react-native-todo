import React, {
	Component,
	PropTypes
} from "react";

import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

export default class MonthOperationBar extends Component {
	static propTypes = {
		gotoLastMonth: PropTypes.func.isRequired,
		gotoNextMonth: PropTypes.func.isRequired,
		gotoYearView: PropTypes.func.isRequired,
		month: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired
	};

	constructor() {
		super();
	}

	render() {
		return (
			<View style = {styles.monthOperationBar}>
				<TouchableOpacity style = {styles.monthChangeBtn} onPress = {this.props.gotoLastMonth}>
					<Text style = {styles.btnText}>上月</Text>
				</TouchableOpacity>
				<TouchableOpacity style = {styles.yearTitle} onPress = {this.props.gotoYearView}>
					<Text style = {styles.btnText}>
						{`${this.props.year}年${this.props.month}月`}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style = {styles.monthChangeBtn} onPress = {this.props.gotoNextMonth}>
					<Text style = {styles.btnText}>下月</Text>
				</TouchableOpacity>
			</View>
		);
	}
};

let styles = StyleSheet.create({
	monthOperationBar: {
		flexDirection: 'row',
		backgroundColor: 'lightblue',
		padding: 10
	},
	monthChangeBtn: {
		flex: 0
	},
	btnText: {
		color: 'white',
		fontSize: 16
	},
	yearTitle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});