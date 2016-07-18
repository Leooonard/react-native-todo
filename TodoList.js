import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	ListView
} from 'react-native';

import {
	getAllTodo
} from './TodoStorage.js';

import TodoItem from './TodoItem.js';

export default class TodoList extends Component {
	static propTypes = {
		navigator: PropTypes.object
	};

	constructor (props) {
		super(props);

		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: this.dataSource.cloneWithRows([])
		};
	}

	componentDidMount () {
		getAllTodo().then((todoList) => {
			this.setState({
				dataSource: this.dataSource.cloneWithRows(todoList)
			});
		});
	}

	jumpToTodo (todoKey) {
		this.props.navigator.push('todoDetail', {
			key: todoKey
		});
	}

	render () {
		return (
			<ListView
				dataSource = {this.state.dataSource}
				renderRow = {todo => {
					return (
						<TodoItem todo = {todo} onPress = {this.jumpToTodo.bind(this)}/>
					);
				}}
			/>
		);
	}
}

let styles = StyleSheet.create({

});