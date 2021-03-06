import React, {
	Component,
	PropTypes
} from 'react';

import {
	Navigator,
	Text,
	TouchableHighlight,
	View,
	StyleSheet
} from 'react-native';

import TODO from './todo.index.js';
import TodoList from './TodoList.js';
import TodoDetail from './TodoDetail.js';

const MAX_SCENE_INDEX = 1;
const NAVBAR_HEIGHT = 50;
const STATUSBAR_HEIGHT = 20;
const routes = [
	{
		title: '新的记录',
		name: 'main',
		index: 0,
		leftButton: false,
		rightButton: true,
		rightButtonText: '记录列表',
		rightButtonPress: ((route, navigator, index, navState) => {
			navigator.push(routes[1]);
		}),
		content: TODO
	}, {
		title: '记录列表',
		name: 'todoList',
		index: 1,
		leftButton: true,
		leftButtonText: '新的记录',
		leftButtonPress: (route, navigator, index, navState) => {
			navigator.pop();
		},
		rightButton: true,
		rightButtonText: '编辑',
		rightButtonPress: ((route, navigator, index, navState) => {
			
		}),
		content: TodoList
	}, {
		title: '记录',
		name: 'todoDetail',
		index: 2,
		leftButton: true,
		leftButtonText: '记录列表',
		leftButtonPress: (route, navigator, index, navState) => {
			navigator.pop();
		},
		rightButton: false,
		content: TodoDetail
	}
];

class BizNavigator {
	constructor (rnNavigator) {
		this.rnNavigator = rnNavigator;
	}

	push (routeName, param) {
		let targetRouteItem = this.findRoute(routeName, routes);
		if (targetRouteItem) {
			let targetRouteItemCopy = {
				...targetRouteItem,
				param: {
					...param
				}
			};
			this.rnNavigator.push(targetRouteItemCopy);
		}
	}

	pop () {
		this.rnNavigator.pop();
	}

	fresh (param) {
		let currentRoute = this.getCurrentRoute();
		let currentRouteCopy = {
			...currentRoute,
			param: {
				...param
			}
		};
		this.rnNavigator.replace(currentRouteCopy);
	}

	getCurrentRoute () {
		let currentRoutesStack = this.rnNavigator.getCurrentRoutes();
		return currentRoutesStack[currentRoutesStack.length - 1];
	}

	findRoute (routeName, routeList) {
		for (let i = 0, n = routeList.length ; i < n ; i++) {
			let routeItem = routeList[i];
			let {name} = routeItem;

			if (routeName === name) {
				return routeItem;
			}
		}

		return undefined;
	}
}

export default class TodoNavigator extends Component {
	constructor (props) {
		super(props);
	}

	renderView (route, navigator) {
		let Content = route.content;

		return (
			<View style = {styles.scene}>
				<Content 
					navigator = {new BizNavigator(navigator)}
					param = {route.param}
				/>
			</View>
		);
	}

	render() {
		return ( 
			<Navigator 
				initialRoute = {routes[0]}
				renderScene = {
					(route, navigator) => {
						return this.renderView(route, navigator)
					}
				}
			/>
		);
	}
}

let styles = StyleSheet.create({
	scene: {
		paddingTop: STATUSBAR_HEIGHT,
		flex: 1,
		backgroundColor: 'white'
	},
	navbar: {
		height: NAVBAR_HEIGHT,
		backgroundColor: '#5bc0de'
	},
	title: {
		color: 'white',
		fontSize: 16,
		marginTop: 5
	},
	button: {
		color: 'white',
		fontSize: 14,
		padding: 5
	}
});