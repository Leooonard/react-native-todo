import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	ListView,
	Modal,
	LayoutAnimation,
	TouchableHighlight
} from 'react-native';

import {
	getAllTodo
} from './TodoStorage.js';

import TodoItem from './TodoItem.js';

import HeaderView from './HeaderView.js';

import Ratiobox from './Ratiobox.js';

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
			deleteTargetTodoKey: undefined,
			isShowModifyView: false,
			isChosenDeleteMap: {}
		};
	}

	componentWillUpdate() {
   	LayoutAnimation.easeInEaseOut();
  	}

	componentDidMount () {
		getAllTodo().then((todoList) => {
			this.todoList = [...todoList];
			this.setState({
				dataSource: this.dataSource.cloneWithRows(this.todoList),
				isChosenDeleteMap: this.updateIsChosenDeleteMap(this.todoList)
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

	updateIsChosenDeleteMap (todoList) {
		return [...todoList].reduce((mapObj, todo) => {
			let {key} = todo;
			let {isChosenDeleteMap} = this.state;

			if (isChosenDeleteMap[key] !== undefined) {
				mapObj[key] = isChosenDeleteMap[key];
				return mapObj;
			} else {
				mapObj[key] = false;
				return mapObj;
			}
		}, {});
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

	showModifyOperationBar () {
		if (this.state.isShowModifyView) {
			return (
				<View style = {{
					flexDirection: 'row',
					height: 100,
					alignSelf: 'stretch',
					backgroundColor: 'red',
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					alignItems: 'center'
				}}>	
					<TouchableHighlight style = {{flex: 1}}>
						<Text>全选</Text>
					</TouchableHighlight>
					<TouchableHighlight style = {{flex: 1}}>
						<Text>删除</Text>
					</TouchableHighlight>
				</View>
			);
		} else {
			return null;
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
					leftOnPress = {() => {
						this.props.navigator.pop();
					}}
					rightText = {this.state.isShowModifyView ? '完成' : '编辑'}
					rightOnPress = {() => {
						this.setState({
							isShowModifyView: !this.state.isShowModifyView
						});
					}}
					titleText = {'hahaha'}
				/>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {todo => {
						if (this.state.isShowModifyView) {
							return (
								<View style = {{
									flexDirection: 'row'
								}}> 
									<View style = {{alignSelf: 'center'}}>
										<Ratiobox onChange = {() => {
											let {isChosenDeleteMap} = this.state;
											isChosenDeleteMap[todo.key] = !isChosenDeleteMap[todo.key];
											this.setState({
												isChosenDeleteMap
											});
										}} chosen = {this.state.isChosenDeleteMap[todo.key]} />
									</View>
									<TodoItem 
										todo = {todo} 
										onPress = {this.jumpToTodo.bind(this)}
										onLongPress = {this.showDeleteItemModal.bind(this)}
									/>
								</View>
							);
						} else {
							return (
								<View>
									<TodoItem 
										todo = {todo} 
										onPress = {this.jumpToTodo.bind(this)}
										onLongPress = {this.showDeleteItemModal.bind(this)}
									/>
								</View>
							);
						}
					}}
				/>
				{this.showModifyOperationBar()}
			</View>
		);
	}
}

let styles = StyleSheet.create({

});