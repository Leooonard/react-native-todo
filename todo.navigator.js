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
const routes = [
	{
		title: '新的记录',
		index: 0,
		leftButton: false,
		rightButton: true,
		rightButtonText: '记录列表',
		rightButtonPress: (route, navigator, index, navState) => {
			navigator.push(routes[1]);
		},
		content: <TODO/>
	}, {
		title: '记录列表',
		index: 1,
		leftButton: true,
		leftButtonText: '新的记录',
		leftButtonPress: (route, navigator, index, navState) => {
			navigator.pop();
		},
		rightButton: false,
		content: <TodoList/>
	}, {
		title: '记录',
		index: 2,
		leftButton: true,
		leftButtonText: '记录列表',
		leftButtonPress: (route, navigator, index, navState) => {
			navigator.pop();
		},
		rightButton: false,
		content: <TodoDetail/>
	}
];

export default class TodoNavigator extends Component {
	constructor (props) {
		super(props);
	}

	renderView (route, navigator) {
		return (
			<View style = {styles.scene}>
				{route.content}
			</View>
		);
	}

	render() {
		return ( 
			<Navigator 
				initialRoute = {routes[0]}
				initialRouteStack = {routes}
				renderScene = {
					(route, navigator) => {
						return this.renderView(route, navigator)
					}
				}
				navigationBar = {
			     	<Navigator.NavigationBar
			       	routeMapper={{
			         	LeftButton: (route, navigator, index, navState) =>{
			         		if (route.leftButton) {
			         			return (
				         			<TouchableHighlight
				         				onPress = {() => {
				         					route.leftButtonPress(route, navigator, index, navState);
				         				}}
				         			>
				         				<Text style = {styles.button}>
				         					{route.leftButtonText}
				         				</Text>
				         			</TouchableHighlight>
				         		); 
			         		} else {
			         			return null;
			         		}
			         	},
			         	RightButton: (route, navigator, index, navState) =>{ 
			         		if (route.rightButton) {
			         			return (
			         				<TouchableHighlight
			         					onPress = {() => {
			         						route.rightButtonPress(route, navigator, index, navState);
			         					}}
			         				>
			         					<Text style = {styles.button}>
			         						{route.rightButtonText}
			         					</Text>
			         				</TouchableHighlight>
			         			);
			         		}
			         	},
			         	Title: (route, navigator, index, navState) =>{ 
			         		return (
			         			<Text style = {styles.title}>{route.title}</Text>
			         		); 
			         	}
			       	}}
			       	style={styles.navbar}
			     	/>
			  	}
			/>
		);
	}
}

let styles = StyleSheet.create({
	scene: {
		marginTop: NAVBAR_HEIGHT,
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