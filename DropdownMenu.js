import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';

let {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const TRIANGLE_WIDTH = 12;
const ERROR_NUM = -1;

const BORDER_MARGIN = 0;

export default class DropdownMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			contentWidth: ERROR_NUM,
			contentHeight: ERROR_NUM
		};
	}

	closeMask () {
		this.props.onClose && this.props.onClose();
	}

	updateContentLayout (e) {
		let {nativeEvent: {
			layout: {
				width: contentWidth,
				height: contentHeight
			}
		}} = e;

		this.setState({
			contentWidth,
			contentHeight
		});
	}

	caculateContentLeft () {
		let contentLeft = this.props.left - this.state.contentWidth / 2;

		if (contentLeft + this.state.contentWidth > windowWidth) {
			contentLeft = windowWidth - this.state.contentWidth - BORDER_MARGIN;
		} else if (contentLeft < 0) {
			contentLeft = BORDER_MARGIN;
		}

		return contentLeft;
	}

	render () {
		let Children = undefined;

		if (this.state.contentWidth === ERROR_NUM && 
			this.state.contentHeight === ERROR_NUM) {
			Children = (
				<View
					style = {{
						opacity: 0
					}}
				>
					<TouchableWithoutFeedback 
						onLayout = {this.updateContentLayout.bind(this)}
					>
						{this.props.children}
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			Children = (
				<View 
					style = {{
						width: this.state.contentWidth,
						height: this.state.contentHeight,
						position: 'absolute',
						left: this.caculateContentLeft(),
						top: this.props.top + TRIANGLE_WIDTH / 2,
					}}
				>
					{this.props.children}
				</View>
			);
		}

		return (
			<TouchableWithoutFeedback
				onPress = {this.closeMask.bind(this)}
			>
				<View style = {styles.maskContainer}>
					{Children}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

let styles = StyleSheet.create({
	maskContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: windowWidth,
		height: windowHeight,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	menuContent: {
		borderRadius: 5,
		backgroundColor: 'rgba(0, 0, 0, 1)'
	},
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: TRIANGLE_WIDTH,
		borderRightWidth: TRIANGLE_WIDTH,
		borderBottomWidth: TRIANGLE_WIDTH,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'gray'
	},
});