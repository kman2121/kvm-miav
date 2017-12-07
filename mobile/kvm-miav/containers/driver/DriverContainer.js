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
			jobLoc: []
		};
	}

	async componentDidMount() {
		const jobs = await api.getJobs();
		this.setState({
			jobs
		});
	}

	switchScreen(jobloc) {
		this.setState({
			screen: ScreenEnum.DIRECTIONS,
			jobLoc: jobloc
		});
	}

	render() {
		let screenToShow;
		switch (this.state.screen) {
			case ScreenEnum.DIRECTIONS:
				screenToShow = <DirectionScreen jobloc={this.state.jobLoc}/>;
				break;
			case ScreenEnum.SEARCHING:
			default:
				screenToShow = <SearchingScreen jobs={this.state.jobs} switchScreen={()=>this.switchScreen()}/>;
				break;
		}

		return (
			<View style={styles.container}>
                <Button title='Log Out' onPress={this.props.logout} />
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