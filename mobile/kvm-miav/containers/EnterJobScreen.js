import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { MiniMap } from '../components';

export class EnterJobScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MiniMap />
        </View>

        <View style={styles.formContainer}>
          <Text>TODO: this should have a tabbed view with the moving/junk forms</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#222'
  },
  formContainer: {
    flex: 3
  }
});
