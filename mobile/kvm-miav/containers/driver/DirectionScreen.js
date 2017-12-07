import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import {
	Location,
	Permissions
} from 'expo';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBDPfVApWIZPuJgZOOlMXMvnhvoRZ_mxFs';

export class DirectionScreen extends React.Component {
	constructor(props) {
		super(props);

		this.getCurrentLocation();
		this.state = {
			lat: 40.755644,
			lng: -73.956097
		};
	}


	async getCurrentLocation() {
		const {
			status
		} = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			const location = await Location.getCurrentPositionAsync({});
			this.setState({
				lat: location.coords.latitude,
				lng: location.coords.longitude
			});
		}
	}

	render() {
		console.log(this.props.jobLoc)
		return (
			<View style={styles.wrapper}>
        <MapView
          style={styles.map}
          customMapStyle={require('../../assets/gmap_style.json')}
        //   region={{
        //     latitude: this.state.lat,
        //     longitude: this.state.lng,
        //     latitudeDelta: 0.015,
        //     longitudeDelta: 0.0121,
        // }}
        >
          <MapViewDirections
            origin={{latitude: this.state.lat, longitude: this.state.lng}}
            destination={{latitude: this.props.jobLoc[0], longitude: this.props.jobLoc[1]}}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#222'
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
});