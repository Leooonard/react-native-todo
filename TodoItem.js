import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import {
	Button
} from 'doly';

export default class TodoItem extends Component {
	static propTypes = {
		todo: PropTypes.object.isRequired,
		onPress: PropTypes.func,
		onLongPress: PropTypes.func
	};

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<TouchableHighlight 
				onPress = {
					() => {
						if (typeof this.props.onPress === 'function') {
							this.props.onPress(this.props.todo.key);
						}
					}
				}
				onLongPress = {
					() => {
						if (typeof this.props.onLongPress === 'function') {
							this.props.onLongPress(this.props.todo.key);
						}
					}
				}
			>
				<View style = {styles.todoWrapper}>
					<View style = {styles.titleWrapper}>
						<Text style = {styles.todoTitle}>
			            {this.props.todo.todoObj.input}
			         </Text>
			         <Text style = {styles.deadline}>
			         	{'Deadline: ' + this.props.todo.todoObj.date}
			         </Text>
					</View>
		         <View style = {styles.contentWrapper}>
		         	<Text style = {styles.content}>
		         		{this.props.todo.todoObj.content}
		         	</Text>
		         </View>
				</View>
			</TouchableHighlight>
      );
	}
}

let styles = StyleSheet.create({
	todoWrapper: {
		backgroundColor: 'white',
		borderColor: '#cacaca',
		borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      margin: 10,
      marginTop: 5,
      marginBottom: 5
	},
	titleWrapper: {
		borderBottomWidth: 1,
		borderBottomColor: "#cacaca",
	},
	todoTitle: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: 'bold'
	},
	deadline: {
		fontSize: 12,
		marginBottom: 5,
	},
	contentWrapper: {
		padding: 5
	},
	content: {
		fontSize: 14
	}
});