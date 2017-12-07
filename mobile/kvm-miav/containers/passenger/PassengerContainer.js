import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import * as api from '../../utils/api';
import { EnterJobScreen } from './EnterJobScreen';
import { PassengerJobHistoryScreen } from './PassengerJobHistoryScreen';

class ScreenEnum {
  static ENTER_JOB = 'ej';
  static JOB_HIST = 'jh';
}

export class PassengerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.ENTER_JOB,
      jobs: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    const jobs = await api.getJobsByPassenger(this.props.user.passenger.id);
    this.setState({ jobs: jobs });
  }

  render() {
    let screenToShow;
    switch (this.state.screen) {
      case ScreenEnum.JOB_HIST:
        screenToShow = <PassengerJobHistoryScreen jobs = {this.state.jobs} />
        break;
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
