import Expo from 'expo';
import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as api from './utils/api';
import * as storage from './utils/storage';
import {
	AuthContainer,
	DriverContainer,
	PassengerContainer
} from './containers';

class ContainerEnum {
	static AUTH = 'a';
	static DRIVER = 'd';
	static PASSENGER = 'p';
}

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// container: ContainerEnum.DRIVER,
			container: ContainerEnum.AUTH,
			user: null
		};
	}

	async componentDidMount() {
		// If there is a token stored, try to verify it and if it is valid, automatically log in
		const token = await storage.getToken();
		if (token) {
			const user = await api.verify(token);
			if (user) {
				this.setUser(user);
			}
		}
	}

	setUser(user) {
		this.setState({
			user
		});
		switch (user.usertype) {
			case 'driver':
				this.setState({
					container: ContainerEnum.DRIVER
				});
				break;
			case 'passenger':
				this.setState({
					container: ContainerEnum.PASSENGER
				});
				break;
			default:
				break;
		}
	}

	login = async (username, password) => {
		const user = await api.login(username, password);
		if (user) {
			this.setUser(user);
		}
	}

	registerPassenger = async (username, password, confirm_password, phone) => {
		const user = await api.register(username, password, confirm_password, phone);
		if (user) {
			this.setUser(user);
		}
	}

	registerDriver = async (username, phone, password, confirm_password, vehicle_year, vehicle_make, vehicle_model, vehicle_license) => {
		const user = await api.register(username, phone, password, confirm_password, vehicle_year, vehicle_make, vehicle_model, vehicle_license);
		if (user) {
			this.setUser(user);
		}
	}

	logout = () => {
		storage.clearUser();
		this.setState({
			container: ContainerEnum.AUTH
		});
	}

	render() {
		let container;
		switch (this.state.container) {
			case ContainerEnum.DRIVER:
				container = <DriverContainer logout={this.logout} />;
				break;
			case ContainerEnum.PASSENGER:
				container = <PassengerContainer logout={this.logout} />;
				break;
			case ContainerEnum.AUTH:
			default:
				container = <AuthContainer login={this.login} />;
				break;
		}

		return (
			<View style={styles.container}>
        { container }
      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'stretch',
		justifyContent: 'center',
		paddingTop: Expo.Constants.statusBarHeight
	},
});

Expo.registerRootComponent(App);