import React, {
	Component,
	PropTypes
} from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import {
	Button
} from 'doly';

export default class TodoItem extends Component {
	static propTypes = {
		todo: PropTypes.object.isRequired,
		onDelete: PropTypes.func
	};

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<View style = {styles.todoWrapper}>
	         <Text style = {styles.todoContent}>
	            {this.props.todo.todoObj.input}
	         </Text>
	         <Text>
	         	{this.props.todo.todoObj.date}
	         </Text>
	         <Button 
	         	click = {() => this.props.onDelete(this.props.todo.key)} 
	         	normalStyle = {{
	         		padding: 3,
	         		height: 30,
	         		flex: 0
	         	}}
	         >
	         	{"删除"}
	         </Button>
			</View>
      );
	}
}

let styles = StyleSheet.create({
	todoWrapper: {
		flexDirection: 'row',
		backgroundColor: '#b2b2b2',
      borderRadius: 4,
      padding: 8,
      marginTop: 8,
      alignItems: 'center',
	},
	todoContent: {
		flex: 1,
      color: 'white',
      fontSize: 16,
	},
	deleteButton: {
		width: 50
	}
});