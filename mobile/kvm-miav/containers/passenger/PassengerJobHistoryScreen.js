import React from 'react';
import {
	Button,
	View,
	StyleSheet,
	ListView,
	Text
} from 'react-native';
import {
	PassengerHistoryJobItem
} from '../../components';

export class PassengerJobHistoryScreen extends React.Component {
	render() {
		const jobItems = this.props.jobs.map(job => {
			return <PassengerHistoryJobItem status={job.status} description={job.description} />;
		});
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		}).cloneWithRows(jobItems);

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>My Past Men</Text>
				</View>
				<View style={styles.listviewContainer}>
					<ListView enableEmptySections={true} dataSource={ds} renderRow={(rowData) => rowData}/>
				</View>

				<Button title='+ New Job' onPress={this.props.createNewJob} />
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
