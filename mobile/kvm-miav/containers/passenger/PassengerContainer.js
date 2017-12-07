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
      screen: ScreenEnum.JOB_HIST,
      jobs: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.goToJobHist();
  }

  goToCreateJob = () => this.setState({ screen: ScreenEnum.ENTER_JOB });
  goToJobHist = async () => {
    this.setState({ screen: ScreenEnum.JOB_HIST});

    const jobs = await api.getJobsByPassenger(this.props.currentUser.passenger.id);
    this.setState({ jobs });
  }

  submitJob = async (job_type, start_time, num_boxes, max_price, description, end_time) => {
    const success = await api.createJob(job_type, start_time, num_boxes, max_price, description, end_time);
    if (success) {
      this.goToJobHist();
    }
  }

  render() {
    let screenToShow;
    switch (this.state.screen) {
      case ScreenEnum.JOB_HIST:
        screenToShow = <PassengerJobHistoryScreen jobs={this.state.jobs} createNewJob={this.goToCreateJob} />
        break;
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
