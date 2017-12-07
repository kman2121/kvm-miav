
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';

export class PassengerHistoryJobItem extends React.Component {
	render = () => {
		let color;
		switch (this.props.status) {
			case 'completed':
				color = 'green';
				break;
			case 'in_progress':
				color = 'yellow';
				break;
			case 'pending':
			default:
				color = 'red';
				break;
		}
		return (
			<View style={{ backgroundColor: color, marginTop: 10 }}>
				<View style={styles.description}>
					<Text style={styles.jobText}>
						{this.props.description}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	description: {
		flex: 3,
		marginLeft: 20,
		marginRight: 20,
		minHeight: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	jobTitle: {
		fontSize: 30,
		color: 'white',
	},
	jobText: {
		fontSize: 20,
		color: 'white',
	}
});