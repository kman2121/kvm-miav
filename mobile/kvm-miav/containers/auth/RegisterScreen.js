import React from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from 'react-native';

import { FormInput } from '../../components';

export class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  setUsername = username => this.setState({ username });
  setPassword = password => this.setState({ password });
  register = () => {
    if (!this.state.username || !this.state.password || !this.state.confirm_password) {
      return;
    }

    this.setState({loading: true});
    this.props.register(this.state.username, this.state.password, this.state.confirm_password);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <FormInput label='Username' onFinishedInput={() => {}} editable={true} />
          <FormInput label='Password' onFinishedInput={() => {}} editable={true} isPassword={true} />
          <FormInput label='Confirm Password' onFinishedInput={() => {}} editable={true} isPassword={true} />

          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button title='LOGIN' onPress={this.props.goToLogin} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='REGISTER' onPress={this.register} />
            </View>
          </View>

          <ActivityIndicator animating={this.props.loading} size={'large'} style={{margin: 20}}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 40
  },
  buttonRow: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flex: 0.45,
    alignItems: 'stretch'
  }
});
