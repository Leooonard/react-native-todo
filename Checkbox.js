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

export default class Checkbox extends Component {
	constructor (props) {
		super(props);

		this.borderWidth = new Animated.Value(0);
		this.borderColor = new Animated.Value(0);
		this.state = {
			chosen: false
		};
	}

	onClick () {
		const DURATION = 250;

		if (!this.state.chosen) {
			Animated.parallel([
				Animated.timing(this.borderWidth, {
					toValue: 1,
					duration: DURATION
				}),
				Animated.timing(this.borderColor, {
					toValue: 1,
					duration: DURATION
				})
			]).start();

			this.setState({
				chosen: true
			});
		} else {
			Animated.parallel([
				Animated.timing(this.borderWidth, {
					toValue: 0,
					duration: DURATION
				}),
				Animated.timing(this.borderColor, {
					toValue: 0,
					duration: DURATION
				})
			]).start();

			this.setState({
				chosen: false
			});
		}
	}

	render () {
		return (
			<TouchableWithoutFeedback onPress = {this.onClick.bind(this)}>
				<Animated.View 
					style = {[styles.container, {
						borderWidth: this.borderWidth.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 5]
						}),
						borderColor: this.borderColor.interpolate({
							inputRange: [0, 1],
							outputRange: ['rgb(149, 149, 149)', 'rgb(79, 159, 207)']
						})
					}]}
				></Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

styles = StyleSheet.create({
	container: {
		width: 15,
		height: 15,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'gray',
		backgroundColor: 'white',
	},
});