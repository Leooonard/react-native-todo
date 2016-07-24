import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	ListView,
	Modal
} from 'react-native';

import {
	getAllTodo
} from './TodoStorage.js';

import TodoItem from './TodoItem.js';

import HeaderView from './HeaderView.js';

export default class TodoList extends Component {
	static propTypes = {
		navigator: PropTypes.object,
		param: PropTypes.object
	};

	constructor (props) {
		super(props);

		this.dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.todoList = [];

		this.state = {
			dataSource: this.dataSource.cloneWithRows(this.todoList),
			isShowDeleteItemModal: false,
			deleteTargetTodoKey: undefined
		};
	}

	componentDidMount () {
		getAllTodo().then((todoList) => {
			this.todoList = [...todoList];
			this.setState({
				dataSource: this.dataSource.cloneWithRows(this.todoList)
			});
		});
	}

	jumpToTodo (todoKey) {
		this.props.navigator.push('todoDetail', {
			key: todoKey
		});
	}

	findTodo (todoKey) {
		for (let i = 0 ; i < this.todoList.length ; i++) {
			let todo = this.todoList[i];
			let {key} = todo;
			if (key === todoKey) {
				return todo;
			}
 		}

 		return undefined;
	}

	showDeleteItemModal (todoKey) {
		let existTodoKey = this.todoList.some((todo) => {
			let {key} = todo;

			if (key === todoKey) {
				return true;
			} else {
				return false;
			}
		})

		if (existTodoKey) {
			this.setState({
				isShowDeleteItemModal: true,
				deleteTargetTodoKey: todoKey
			});
		}
	}

	render () {
		return (
			<View>
				<Modal
					animationType = {'fade'}
					transparent = {true}
					visible = {this.state.isShowDeleteItemModal}
				>
					<View style = {{
						justifyContent: 'center',
						flex: 1,
						backgroundColor: 'rgba(0, 0, 0, 0.2)'
					}}>
						<View style = {{
							backgroundColor: 'white',
							padding: 20,
							margin: 20,
							borderRadius: 10,
							borderWidth: 1,
							borderColor: 'gray',
							alignItems: 'center'
						}}>
							<Text>{"删除"}</Text>
						</View>
					</View>
				</Modal>
				<HeaderView
					leftText = {'返回'}
					rightText = {'下一步'}
					titleText = {'hahaha'}
				/>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {todo => {
						return (
							<TodoItem 
								todo = {todo} 
								onPress = {this.jumpToTodo.bind(this)}
								onLongPress = {this.showDeleteItemModal.bind(this)}
							/>
						);
					}}
				/>
			</View>
		);
	}
}

let styles = StyleSheet.create({

});