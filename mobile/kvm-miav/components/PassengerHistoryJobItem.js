
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';

export class PassengerHistoryJobItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render = () => <View style={styles.containerView}>
                    <TouchableOpacity style={styles.jobContainer} onPress={this.props.pressAction}>
                        <View style={styles.description}>
                            <Text style={styles.jobText}>
                                {this.props.status + '\n'}
                                {this.props.description}
                            </Text>
                        </View>
                   </TouchableOpacity>
               </View>
}

const styles = StyleSheet.create({
	jobContainer: {
		alignItems: 'stretch',
		justifyContent: 'space-between',
		backgroundColor: '#222',
		flexDirection: 'row',
		borderRadius: 3,
		borderColor: 'white',
		borderWidth: 0.2,
		marginBottom: 5,
	},
	price: {
		justifyContent: 'center',
		flex: 1,
	},
	description: {
		flex: 3,
		marginLeft: 20,
	},
	jobTitle: {
		fontSize: 30,
		color: 'white',
	},
	jobText: {
		fontSize: 20,
		color: 'white',
	},
	priceText: {
		fontSize: 40,
		color: 'white'
	}
});