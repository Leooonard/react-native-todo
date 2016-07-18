import React, {
	Component,
	PropTypes
} from 'react';

import {
	View
} from 'react-native';

export default class Scene extends Component {
	static propTypes = {
		navigator: PropTypes.object
	};

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<View>
				{this.props.children}
			</View>
		);
	}
}