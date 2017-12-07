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
	Modal,
	ActivityIndicator,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export class MoveRequest extends React.Component {
	state = {
		rooms: 0,
		isDateTimePickerVisible: false,
		currentMode: 0,
		startTime: "            ",
		endTime: "            ",
		maxPrice: "0",
		description: ""
	};

	_showModal = () => {};

	_hideDateTimePicker = () => this.setState({
		isDateTimePickerVisible: false
	});

	_modeSwitchStart = () => {
		this.setState({
			currentMode: 0,
			isDateTimePickerVisible: true
		});
	};

	_modeSwitchEnd = () => {
		this.setState({
			currentMode: 1,
			isDateTimePickerVisible: true
		});
	};

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
		if (this.state.currentMode == 0) {
			this.setState({
				startTime: hours + ":" + minutes + " " + ampm
			});
		} else {
			this.setState({
				endTime: hours + ":" + minutes + " " + ampm
			});
		}
	};

	_submitJob = () => {
		this.props.submitJob('move', this.state.startTime, this.state.rooms, this.state.maxPrice, this.state.description, this.state.endTime);
	}

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
            <Modal visible={this.state.searching}
                   onRequestClose={(text) => this.setState({searching: false})}
                   transparent={true}
                   style={styles.modalstyle}>
                <View style={styles.modalstyle}>
                    <View style={styles.modalbox}>
                        <Text style={{color: 'white'}}>Searching for MIAVs near you...</Text>
                        <ActivityIndicator animating={this.props.searching} size={'large'}/>
                    </View>
                </View>
            </Modal>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Number of Rooms:</Text>
				<Picker style={{
						width: 100,
                        color: 'white',
					}} selectedValue={this.state.rooms} onValueChange={(itemValue) => this.setState({rooms: itemValue})}>
					{pickeritems}
				</Picker>
			</View>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Job Start Time:</Text>
                <Button onPress={this._modeSwitchStart}
                        style={styles.inputButton}
                        title={this.state.startTime}>
                </Button>
			</View>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Estimated Finish Time:</Text>
                <Button onPress={this._modeSwitchEnd}
                        style={styles.inputButton}
                        title={this.state.endTime}>
                </Button>
			</View>
			<View style={styles.row}>
				<Text style={styles.itemTitle}>Max Price:</Text>
                <Text style={{color:'white'}}>$</Text>
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
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
			</View>
            <View style={styles.row, {justifyContent: 'space-around'}}>
                <Button style={styles.submit} title="SUBMIT" onPress={this._submitJob}></Button>
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
	rowInput: {
		flex: 1
	},
	submit: {},
	modalstyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalbox: {
		backgroundColor: '#3a3838',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: 250,
		height: 200,
		borderRadius: 10,
		borderColor: '#3a3838'
	}
});