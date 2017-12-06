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
		var jobs = [];
		for (let i = 1; i < 7; i++) {
			jobs.push(<JobItem pressAction={() => console.log(i.toString())} address={"321 Royal Oak Lane"} distance={"3 miles"} bid={"$23"} description={"Started From Tha Bottom"}/>);
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
