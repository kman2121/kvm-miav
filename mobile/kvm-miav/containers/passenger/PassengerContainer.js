import Expo from 'expo';
import React from 'react';
import { ActivityIndicator, Button, Modal, StyleSheet, Text, View } from 'react-native';

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
      loading: false
    };
  }

  async componentDidMount() {
    this.goToJobHist();
  }

  goToCreateJob = () => this.setState({ screen: ScreenEnum.ENTER_JOB });
  goToJobHist = async () => {
    this.setState({ screen: ScreenEnum.JOB_HIST });

    const jobs = await api.getJobsByPassenger(this.props.currentUser.passenger.id);
    this.setState({ jobs });
  }

  submitJob = async (job_type, start_time, num_boxes, max_price, description, end_time) => {
    this.setState({ loading: true });
    const success = await api.createJob(job_type, start_time, num_boxes, max_price, description, end_time);
    this.setState({ loading: false });
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
        screenToShow = <EnterJobScreen submitJob={this.submitJob} cancel={this.goToJobHist} />;
        break;
    }

    return (
      <View style={styles.container}>
        <Modal visible={this.state.loading}
               onRequestClose={(text) => this.setState({loading: false})}
               transparent={true}
               style={styles.modalStyles}>
            <View style={styles.modalStyles}>
                <View style={styles.modalBoxStyles}>
                    <Text style={{color: 'white'}}>Submitting request...</Text>
                    <ActivityIndicator animating={this.props.searching} size={'large'}/>
                </View>
            </View>
        </Modal>
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
	modalStyles: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalBoxStyles: {
		backgroundColor: '#3a3838',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: 250,
		height: 200,
		borderRadius: 10,
		borderColor: '#3a3838'
	}
});
