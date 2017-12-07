import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { SearchingScreen } from './SearchingScreen';

class ScreenEnum {
  static SEARCHING = 'sr';
}

export class DriverContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.SEARCHING
    };
  }

  render() {
    let screenToShow;
    switch (this.state.screen) {
      case ScreenEnum.SEARCHING:
      default:
        screenToShow = <SearchingScreen />;
        break;
    }

    return (
      <View style={styles.container}>
        <Button title='Log Out' onPress={this.props.logout} />
        { screenToShow }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
});
