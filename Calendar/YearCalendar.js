import React, {
	Component
} from 'react';

import {
	View,
	Text
} from 'react-native';

export default class YearCalendar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text className = {'month'} id = {'month-1'}>1月</Text>
				<Text className = {'month'} id = {'month-2'}>2月</Text>
				<Text className = {'month'} id = {'month-3'}>3月</Text>
				<Text className = {'month'} id = {'month-4'}>4月</Text>
				<Text className = {'month'} id = {'month-5'}>5月</Text>
				<Text className = {'month'} id = {'month-6'}>6月</Text>
				<Text className = {'month'} id = {'month-7'}>7月</Text>
				<Text className = {'month'} id = {'month-8'}>8月</Text>
				<Text className = {'month'} id = {'month-9'}>9月</Text>
				<Text className = {'month'} id = {'month-10'}>10月</Text>
				<Text className = {'month'} id = {'month-11'}>11月</Text>
				<Text className = {'month'} id = {'month-12'}>12月</Text>
			</View>
		);
	}
}