import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Picker,
	TextInput,
	Button,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export class JunkRequest extends React.Component {
	state = {
		rooms: 0,
		isDateTimePickerVisible: false,
		startTime: "            ",
		maxPrice: "0",
		description: ""
	};

	_hideDateTimePicker = () => this.setState({
		isDateTimePickerVisible: false
	});

	_modeSwitchStart = () => {
		this.setState({
			isDateTimePickerVisible: true
		});
	};

	_submitJob = () => {
		this.props.submitJob('haul', this.state.startTime, this.state.rooms, this.state.maxPrice, this.state.description, undefined);
	}

	_handleDatePicked = (date) => {
		this._hideDateTimePicker();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = "AM";
		if (hours > 12) {
			ampm = "PM"
		}
		hours = hours % 12;
		var pad = "00";
		hours = pad.substring(0, pad.length - hours.toString().length) + hours.toString();
		minutes = pad.substring(0, pad.length - minutes.toString().length) + minutes.toString();
		this.setState({
			startTime: hours + ":" + minutes + " " + ampm
		});
	};

	render() {
		var pickeritems = [];
		for (let i = 1; i < 21; i++) {
			numrm = i.toString();
			pickeritems.push(<Picker.Item key={numrm} label={numrm} value={numrm}/>)
		}
		return (<View style={styles.container}>
            <DateTimePicker mode={'time'}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            value={this.state.startTime}/>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Number of Parcels:</Text>
				<Picker style={{
						width: 100,
                        color: 'white',
					}} selectedValue={this.state.rooms} onValueChange={(itemValue) => this.setState({rooms: itemValue})}>
					{pickeritems}
				</Picker>
			</View>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Pickup Time:</Text>
                <Button onPress={this._modeSwitchStart}
                        style={styles.inputButton}
                        title={this.state.startTime}>
                </Button>
			</View>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Max Price:</Text>
                <Text style={{color:'white'}}>$ </Text>
                <TextInput style={{flex: 1, marginRight: 200, color:'white'}}
                           keyboardType={'numeric'}
                           maxLength={500}
                           onChangeText={(value)=>this.setState({maxPrice: value})}/>
			</View>
            <View>
				<Text style={styles.itemTitle}>Describe Your Job:</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({description: text})}
					value={this.state.description}
					style={{color: 'white'}} />
			</View>

			<View style={styles.buttonRow}>
				<View style={styles.buttonContainer}>
					<Button title='CANCEL' onPress={this.props.cancel} />
				</View>
				<View style={styles.buttonContainer}>
					<Button title='SUBMIT' onPress={this._submitJob} />
				</View>
          	</View>
		</View>);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	itemTitle: {
		marginLeft: 20,
		marginRight: 20,
		color: 'white',
	},
	row: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonContainer: {
		flex: 0.45,
		alignItems: 'stretch'
	}
});
