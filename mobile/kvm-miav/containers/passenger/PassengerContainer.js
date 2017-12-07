import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { EnterJobScreen } from './EnterJobScreen';

class ScreenEnum {
  static ENTER_JOB = 'ej';
}

export class PassengerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.ENTER_JOB,

      isLoading: false
    };
  }

  render() {
    let screenToShow;
    switch (this.state.screen) {
      case ScreenEnum.ENTER_JOB:
      default:
        screenToShow = <EnterJobScreen />;
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
