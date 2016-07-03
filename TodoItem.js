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
	            {this.props.todo.content}
	         </Text>
	         <Button 
	         	click = {() => this.props.onDelete(this.props.todo.key)} 
	         	normalStyle = {{
	         		flex: 1,
	         		padding: 3,
	         		height: 30,
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
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#b2b2b2',
      borderRadius: 4,
      padding: 8,
      marginTop: 8,
      alignItems: 'center',
	},
	todoContent: {
		flex: 5,
      color: 'white',
      fontSize: 16,
	},
	deleteButton: {
		width: 50
	}
});