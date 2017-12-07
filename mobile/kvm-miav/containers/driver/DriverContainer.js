import Expo from 'expo';
import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as api from '../../utils/api';
import {
	SearchingScreen,
} from './SearchingScreen';
import {
	DirectionScreen,
} from './DirectionScreen';

class ScreenEnum {
	static SEARCHING = 'sr';
	static DIRECTIONS = 'dir';
}

export class DriverContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			screen: ScreenEnum.SEARCHING,
			jobs: [],
			currentJob: -1
		};
	}

	async componentDidMount() {
		const jobs = await api.getJobs();
		this.setState({
			jobs
		});
	}

	switchScreen(jobid) {
		this.setState({
			screen: ScreenEnum.DIRECTIONS,
			currentJob: jobid
		});
	}

	render() {
		let screenToShow;
		switch (this.state.screen) {
			case ScreenEnum.DIRECTIONS:
				screenToShow = <DirectionScreen jobid={this.state.currentJob}/>;
				break;
			case ScreenEnum.SEARCHING:
			default:
				screenToShow = <SearchingScreen jobs={this.state.jobs} switchScreen={()=>this.switchScreen()}/>;
				break;
		}

		return (
			<View style={styles.container}>
        { screenToShow }
      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'center'
	},
});