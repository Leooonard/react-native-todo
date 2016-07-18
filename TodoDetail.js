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
	getTodo
} from './TodoStorage.js';

export default class TodoDetail extends Component {
	static propTypes = {
		navigator: PropTypes.object,
		param: PropTypes.object
	};

	constructor (props) {
		super(props);

		this.state = {
			todo: undefined
		};
	}

	componentDidMount () {
		let {param} = this.props;

		getTodo(param.key)
		.then((todo) => {
			this.setState({
				todo
			});
		});
	}

	render () {
		let {todo} = this.state;

		if (todo) {
			return (
				<View style = {styles.wrapper}>
					<View style = {styles.titleWrapper}>
						<Text style = {styles.title}>
							{todo.input}
						</Text>
					</View>
					<View style = {styles.dateWrapper}>
						<Text style = {styles.date}>{todo.date}</Text>
					</View>
					<View style = {styles.contentWrapper}>
						<Text style = {styles.content}>{todo.content}</Text>
					</View>
				</View>
			);
		} else {
			return null;
		}
	}
}

let styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'white'
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 10
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold'
	},
	dateWrapper: {
		alignItems: 'flex-end',
		marginRight: 20,
		marginTop: 10
	},
	date: {
		fontSize: 15
	},
	contentWrapper: {
		marginTop: 10,
		paddingLeft: 5,
		paddingRight: 5
	},
	content: {
		fontSize: 14
	}
})