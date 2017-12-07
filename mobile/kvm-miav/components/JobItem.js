import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';

export class JobItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render = () => (
		<View style={styles.containerView}>
                    <TouchableOpacity style={styles.jobContainer} onPress={this.props.pressAction}>
                        <View style={styles.description}>
                            <Text style={styles.jobTitle}>
                                {this.props.job.type === 'move' ? 'Moving: ' : 'Haul for: '}
                                {this.props.job.passenger.username}
                            </Text>
                            <Text style={styles.jobText}>
                                {this.props.job.num_boxes + 'Rooms \n'}
                                {this.props.job.start_time + " - " + this.props.job.end_time + "\n"}
                                {this.props.job.description}
                            </Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>
                                {this.props.job.max_price}
                            </Text>
                        </View>
                   </TouchableOpacity>
               </View>
	)
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