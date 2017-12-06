import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

export class PickUserScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
              <View style={styles.subcontainer1}>
                  <Text style={styles.text}>What type of user are you?</Text>
              </View>
              <TouchableOpacity style={styles.subcontainer2} onPress={this.props.onPressProvider}>
                  <Text style={styles.text}>I OWN A MOVING VAN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subcontainer2} onPress={this.props.onPressClient}>
                  <Text style={styles.text}>I NEED MY STUFF MOVED</Text>
              </TouchableOpacity>
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		flexDirection: 'column',
	},
	subcontainer1: {
		flex: 1,
		backgroundColor: '#222',
		alignItems: "center",
		justifyContent: "center",
	},
	subcontainer2: {
		backgroundColor: '#222',
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#d6d7da',
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	typeButton: {
		color: "#0000ff",
	},
	text: {
		color: "#fff",
		fontWeight: 'bold',
		fontSize: 20,
	},
});