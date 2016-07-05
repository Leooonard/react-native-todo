import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	TouchableWithoutFeedback,
	Text,
	StyleSheet,
	Animated
} from 'react-native';

export default class Ratiobox extends Component {
	constructor (props) {
		super(props);

		this.firstStrokeLength = new Animated.Value(0);
		this.secondStrokeLength = new Animated.Value(0);
		this.state = {
			chosen: false
		};
	}

	onClick () {
		const FIRST_STROKE_DURATION = 75;
		const SECOND_STROKE_DURATION = 150;

		if (this.state.chosen) {
			Animated.sequence([
				Animated.timing(this.secondStrokeLength, {
					toValue: 0,
					duration: SECOND_STROKE_DURATION
				}),
				Animated.timing(this.firstStrokeLength, {
					toValue: 0,
					duration: FIRST_STROKE_DURATION
				})
			]).start();
			this.setState({
				chosen: false
			});
		} else {
			Animated.sequence([
				Animated.timing(this.firstStrokeLength, {
					toValue: 1,
					duration: FIRST_STROKE_DURATION
				}),
				Animated.timing(this.secondStrokeLength, {
					toValue: 1,
					duration: SECOND_STROKE_DURATION
				})
			]).start();
			this.setState({
				chosen: true
			});
		}
	}

	render () {
		return (
			<TouchableWithoutFeedback onPress = {this.onClick.bind(this)}>
				<View style = {styles.container}>
					<View
						style = {{
							transform: [{
								rotate: '-45deg'
							}, {
								translateY: -1
							}, {
								translateX: 1
							}],
							backgroundColor: 'transparent',
							width: 13,
							height: 13
						}}
					>
						<Animated.View style = {{
							position: 'absolute',
							left: 0,
							top: 2,
							width: 3,
							height: this.firstStrokeLength.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 6]
							}),
							backgroundColor: 'blue'
						}}></Animated.View>
						<Animated.View style = {{
							position: 'absolute',
							left: 0,
							top: 8,
							width: this.secondStrokeLength.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 12]
							}),
							height: 3,
							backgroundColor: 'blue'
						}}></Animated.View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

styles = StyleSheet.create({
	container: {
		width: 15,
		height: 15,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: 'lightblue',
		backgroundColor: 'white',
	},
});