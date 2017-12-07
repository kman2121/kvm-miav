import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import * as api from '../../utils/api';
import { EnterJobScreen } from './EnterJobScreen';

class ScreenEnum {
  static ENTER_JOB = 'ej';
}

export class PassengerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.ENTER_JOB
    };
  }

  submitJob = async (job_type, start_time, num_boxes, max_price, description, end_time) => {
    const success = api.createJob(job_type, start_time, num_boxes, max_price, description, end_time);
    console.log(success);
  }

  render() {
    let screenToShow;
    switch (this.state.screen) {
      case ScreenEnum.ENTER_JOB:
      default:
        screenToShow = <EnterJobScreen submitJob={this.submitJob} />;
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
