import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

export default class HeaderView extends Component {
	static propTypes = {
		leftText: PropTypes.string,
		rightText: PropTypes.string,

		leftOnPress: PropTypes.func,
		rightOnPress: PropTypes.func,

		titleText: PropTypes.string
	};

	static defaultProps = {
		leftText: '',
		rightText: '',

		leftOnPress: () => {},
		rightOnPress: () => {},

		titleText: ''
	};

	constructor (props) {
		super(props);

		this.state = {

		};
	}

	renderNavigationButton (text, onPress) {
		const EMPTY_TEXT = '';

		if (text === EMPTY_TEXT) {
			return <View></View>;
		} else {
			return (
				<TouchableOpacity onPress = {onPress}>
					<View style = {styles.buttonWrapper}>
						<Text style = {styles.buttonText}>
							{text}
						</Text>
					</View>
				</TouchableOpacity>
			);
		}
	}

	render () {
		return (
			<View style = {styles.navigationWrapper}>
				{
					this.renderNavigationButton(this.props.leftText, 
														this.props.leftOnPress.bind(this))
				}
				{
					this.renderNavigationButton(this.props.rightText, 
														this.props.rightOnPress.bind(this))
				}
				<View style = {styles.titleWrapper}>
					<Text style = {styles.titleText}>
						{this.props.titleText}
					</Text>
				</View>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	navigationWrapper: {
		backgroundColor: '#5bc0de',
		flexDirection: 'row',
		paddingLeft: 2,
		paddingRight: 2,
		height: 40,
		justifyContent: 'space-between'
	},
	buttonWrapper: {
		flex: 0,
		padding: 10,
	},
	buttonText: {
		color: 'white'
	},
	titleWrapper: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		right: 0
	},
	titleText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	}
});