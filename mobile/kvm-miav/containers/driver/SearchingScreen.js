import React from 'react';
import {
	View,
	StyleSheet,
	ListView,
	Text
} from 'react-native';
import {
	JobItem
} from '../../components';

export class SearchingScreen extends React.Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: ds
		};
	}

	componentDidMount() {
		this.loadJobs();
	}

	loadJobs() {
		jobs = []
		for (let i = 0; i < this.props.jobs.length; i++) {
			if (this.props.jobs[i].status == 'pending') {
				jobs.push(<JobItem pressAction={() => this.props.switchScreen(this.props.jobs[i].job_loc)} job={this.prop.jobs[i]}/>);
			}
		}
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(jobs)
		});
	}

	render() {
		return (
			<View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Jobs Near You</Text>
                    </View>
                    <View style={styles.listviewContainer}>
		                <ListView dataSource={this.state.dataSource} renderRow={(rowData) => rowData}/>
                    </View>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-between',
		backgroundColor: 'black',
		padding: 10,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		color: 'white',
		fontSize: 40,
	},
	listviewContainer: {
		flex: 5,
		alignItems: 'stretch',
	}
});