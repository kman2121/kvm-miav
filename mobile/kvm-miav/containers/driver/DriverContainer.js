import Expo from 'expo';
import React from 'react';
import {
	StyleSheet,
	View,
	Button
} from 'react-native';

import * as api from '../../utils/api';
import {
	SearchingScreen,
} from './SearchingScreen';
import {
	DirectionScreen,
} from './DirectionScreen';
import { setTimeout } from 'core-js/library/web/timers';

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
			job: {},
			intervalId: 0
		};
	}

	componentDidMount() {
		this.switchSearch();
		const intervalId = setInterval(() => this.refreshJobs(), 15 * 1000);
		this.setState({ intervalId });
	}

	switchDirections = async (job) => {
		const success = await api.changeJobStatus(job.id, 'in_progress');
		if (success) {
			this.setState({
				screen: ScreenEnum.DIRECTIONS,
				job: job
			});
		}
	}

	refreshJobs = async () => {
		const jobs = await api.getJobs();
		this.setState({
			jobs
		});
	}

	switchSearch = async () => {
		this.refreshJobs();

		this.setState({
			screen: ScreenEnum.SEARCHING,
			job: {}
		});
	}

	render() {
		let screenToShow;
		switch (this.state.screen) {
			case ScreenEnum.DIRECTIONS:
				screenToShow = <DirectionScreen jobLoc={this.state.job.job_loc} jobId={this.state.job.id} switchScreen={this.switchSearch}/>;
				break;
			case ScreenEnum.SEARCHING:
			default:
				screenToShow = <SearchingScreen jobs={this.state.jobs} switchScreen={this.switchDirections}/>;
				break;
		}

		return (
			<View style={styles.container}>
                <Button title='Log Out' onPress={this.props.logout} />
                { screenToShow }
            </View>
		);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
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