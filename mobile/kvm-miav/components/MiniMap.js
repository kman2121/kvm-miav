import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Location, Permissions } from 'expo';

import MapView from 'react-native-maps';

export class MiniMap extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrentLocation();
    this.state = {
      lat: 40.755644,
      lng: -73.956097
    };
  }

  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.map}
          customMapStyle={require('../assets/gmap_style.json')}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <MapView.Circle center={{latitude: this.state.lat, longitude: this.state.lng}}
                          radius={100}
                          strokeWidth={10}
                          strokeColor={'rgba(200, 200, 255, .4)'} />
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
