import React from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	Button
} from 'react-native';
import {
	Location,
	Permissions,
} from 'expo';
import * as api from '../../utils/api';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBDPfVApWIZPuJgZOOlMXMvnhvoRZ_mxFs';
const {
	width,
	height
} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export class DirectionScreen extends React.Component {
	constructor(props) {
		super(props);
		this.getCurrentLocation();
		this.state = {
			lat: 40.755644,
			lng: -73.956097
		};
		this.mapView = null;
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

	markDone = async () => {
		const success = await api.changeJobStatus(this.props.jobId, 'completed');
		if (success) {
			this.props.switchScreen();
		}
	}

	render() {
		console.log({
			latitude: parseFloat(this.props.jobLoc[0]),
			longitude: parseFloat(this.props.jobLoc[1])
		})
		return (
			<View style={styles.wrapper}>
                <MapView
                  style={styles.map}
                  customMapStyle={require('../../assets/gmap_style.json')}
                  initialRegion={{
                    latitude: this.state.lat,
                    longitude: this.state.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                ref={c => this.mapView = c}>
                  <MapView.Marker coordinate={{latitude: this.state.lat, longitude: this.state.lng}}/>
                  <MapView.Marker coordinate={{latitude: parseFloat(this.props.jobLoc[0]), longitude: parseFloat(this.props.jobLoc[1])}}/>
                  <MapViewDirections
                    origin={{latitude: this.state.lat, longitude: this.state.lng}}
                    destination={{latitude: parseFloat(this.props.jobLoc[0]), longitude: parseFloat(this.props.jobLoc[1])}}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor="hotpink"
                    onReady={(result) => {
                      this.mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          right: parseInt(width / 20),
                          bottom: parseInt(height / 20),
                          left: parseInt(width / 20),
                          top: parseInt(height / 20),
                        }
                      });
                    }}
                  />
                </MapView>
                <Button color='red' title='Done With Job' onPress={this.markDone} />
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
		alignSelf: 'stretch',
		flex: 1
	},
});