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
	render() {
		const jobItems = this.props.jobs.filter(job => job.status === 'pending').map(job => {
			return <JobItem pressAction={() => this.props.switchScreen(job.job_loc)} job={job}/>;
		});
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		}).cloneWithRows(jobItems);

		return (
			<View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Jobs Near You</Text>
                    </View>
                    <View style={styles.listviewContainer}>
		                <ListView dataSource={ds} renderRow={(rowData) => rowData}/>
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